# webqit.io
To deploy:

docker run -d -p 80:3000 --name my-app webqit/webflo webflo start --dev
docker exec my-app webflo deploy https://github.com/webqit/webqit.io.git
docker exec my-app npm i