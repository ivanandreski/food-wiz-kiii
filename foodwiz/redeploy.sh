

#docker ps | grep food-base-web | awk '{print $1}' | xargs docker stop

# docker-compose down
# docker image rm -f food-wiz-backend food-wiz-client food-wiz-automation

git pull

cd ./food-wiz-backend
mvn clean compile assembly:single
cd ..

# docker-compose  up -d

#docker build -t food-base-web:latest .
#docker run -d -p 5000:5000 food-base-web
#echo "Docker id: "
#docker ps | grep food-base-web | awk '{print $1}'
#echo "Logs: "
#docker ps | grep food-base-web | awk '{print $1}' | xargs docker logs -f




