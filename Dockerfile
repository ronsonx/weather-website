FROM node:12

WORKDIR /app

ENV DARK_SKY_API_KEY ""
ENV MAPBOX_TOKEN ""
ENV PORT 3000
# Install and cache
COPY package.json      /tmp/package.json
COPY package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install --production
RUN mv /tmp/node_modules /app/node_modules

COPY . .

# You must use -p 9009:80 when running the image
EXPOSE 3000

CMD ["node", "./src/app.js"]
