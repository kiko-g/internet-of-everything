# Edge 
## How to run (with docker): 
1. Run docker compose on detached mode.
```
    sudo docker-compose build 
    sudo docker-compose up -d
```
2. To get the log prints from the machine sensors
```
    sudo docker logs machines --follow
``` 
3. To get the log prints from the product tracking sensors
```
    sudo docker logs products --follow
```
4. To get the log prints from the failure service
```
    sudo docker logs failure-service --follow
```
5. To stop the project. 
```
    sudo docker-compose stop
```