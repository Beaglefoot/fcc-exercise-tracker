# Exercise Tracker

This is the fourth project in Apis and Microservices section from updated [freeCodeCamp](https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/exercise-tracker) curriculum.

*There are no specific user stories, except functional similarity with [provided example](https://fuschia-custard.glitch.me/).*

### Examples of usage:

#### Create user:

Input
```
curl -X POST 'https://fcc-exercise-tracker-bf.glitch.me/users' -H 'content-type: application/json' -d '{"name":"Kory"}'
```

Output
```
{"username":"Kory","userId":"5b3298fd1eaf6c237a5a6019"}
```

#### Add exercise:

Input
```
curl -X POST 'https://fcc-exercise-tracker-bf.glitch.me/users/5b3298fd1eaf6c237a5a6019/exercises' -H 'content-type: application/json' -d '{"description":"jogging","duration":60,"date":"2018-07-16"}'
```

Output
```
{"username":"Kory","userId":"5b3298fd1eaf6c237a5a6019","exerciseId":"5b32998b1eaf6c237a5a601a","description":"jogging","duration":60,"date":"2018-07-16"}
```

#### Get exercises:

Input
```
curl -X GET 'https://fcc-exercise-tracker-bf.glitch.me/users/5b3298fd1eaf6c237a5a6019/exercises'
```

Output
```
{"userId":"5b3298fd1eaf6c237a5a6019","name":"Kory","exercises":[{"_id":"5b32998b1eaf6c237a5a601a","description":"jogging","duration":60,"date":"2018-07-16"}]}
```
