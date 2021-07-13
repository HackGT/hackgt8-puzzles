FROM node:12.4-alpine

# Bundle Source
RUN mkdir -p /usr/src/hackgt8-puzzles
WORKDIR /usr/src/hackgt8-puzzles
COPY . /usr/src/hackgt8-puzzles
RUN yarn install --unsafe-perm

# Set Timezone to EST
RUN apk add tzdata
ENV TZ="/usr/share/zoneinfo/America/New_York"

FROM node:12.4-alpine
COPY --from=0 /usr/src/hackgt8-puzzles/server/ /usr/src/hackgt8-puzzles/server/
COPY --from=0 /usr/src/hackgt8-puzzles/client/ /usr/src/hackgt8-puzzles/client/
EXPOSE 3000
WORKDIR /usr/src/hackgt7-puzzles/server
CMD ["node", "build/app.js"]