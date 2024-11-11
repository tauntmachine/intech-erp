#!/bin/bash

# navigate to app folder
cd /app/fe

# install dependencies
npm install
npm run build
cp -r build/* /var/www/html
export BACKEND_URL=$(aws ssm get-parameter --name "Intech ERP_backend_url" --query "Parameter.Value" --output text)
source ~/.bashrc
npm install pm2 -g