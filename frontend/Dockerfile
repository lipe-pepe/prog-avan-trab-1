# Use a lighter version of Node as a parent image
FROM node:16
# Set the working directory to /frontend
WORKDIR /frontend
# copy package.json into the container at /frontend
COPY package*.json /frontend/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /frontend
COPY . /frontend/
# Make port 3000 available to the world outside this container
EXPOSE 3001
# Run the app when the container launches
CMD ["npm", "start"]