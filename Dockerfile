FROM node:14.15.4 AS builder

# Work in /usr/app/ directory
WORKDIR /usr/app/

RUN npm install -g @ionic/cli @angular/cli

COPY package*.json ./
# RUN npm install -g nodemon
RUN npm install
RUN npm audit fix
# Copy source to working dir
COPY . .
#run application
# CMD ["ionic", "cordova", "build", "browser", "--prod"]
# RUN cordova telemetry on
# RUN ionic cordova plugin add cordova-plugin-network-information --confirm
# RUN ionic cordova plugin add cordova-plugin-camera --confirm
# RUN ionic cordova platform add browser --no-interactive --confirm
# RUN npm uninstall protractor
# RUN npm install protractor
# RUN npm audit fix
# RUN ionic cordova build browser --prod --no-interactive --confirm
RUN ionic build --prod --no-interactive --confirm
# CMD ["ionic", "build", "--prod", "--no-interactive", "--confirm"]

FROM nginx:latest
COPY --from=builder /usr/app/www/ /usr/share/nginx/html
