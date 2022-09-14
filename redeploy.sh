

#docker ps | grep food-base-web | awk '{print $1}' | xargs docker stop
docker-compose down
docker image rm -f food-wiz_backend food-wiz_client

git pull


#docker build -t food-base-web:latest .
#docker run -d -p 5000:5000 food-base-web
docker-compose  up -d
#echo "Docker id: "
#docker ps | grep food-base-web | awk '{print $1}'
#echo "Logs: "
#docker ps | grep food-base-web | awk '{print $1}' | xargs docker logs -f




