#install adonis cli
sudo npm i -g @adonisjs/cli

#create api only progect
adonis new serverAdonisAPI --api-only

# auth route
Route.post('auth/register', ({request}) => { return {'Aou response '}});

# user Controller
adonis make:controller User

class UserController {
  register(){
    return {
      message: 'Hello from Usercontroller'
    }
  }
}

# auth route change for controller
Route.post('auth/register', 'UserController.register');

# Group routes to api
Route.group(() => {
  Route.post('auth/register', 'UserController.register');
}).prefix('api');

#constructing Controller to add users
class UserController {
  async register({ request }){
    const { email, password } = request.all();
    const user = await User.create({
      email, 
      password,
      username: email
    });
    return user;
  }
}

#install sqlite3
npm install sqlite3 -save

#run migration
adonis migration:run

#add login
Route.post('auth/login', 'UserController.login');

  async login({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }

#Add Testobj model
adonis make:model Testobj -m
#Config migration table and run it
adonis migration:run

#Add controller for Testobj
adonis make:controller Testobj

#Add Exception InvalidAccess
adonis make:exception InvalidAccess

#Add Exception ResourceNotExistException
adonis make:exception ResourceNotExistException

#Add update Testobj

#RESTfull resource route refactoring
Route.resource('tests', 'TestobjController').apiOnly().middleware('auth').formats(['json'])

#Create resource Quiz nested to Testobj
adonis make:model -m Quiz
adonis make:controller Quiz
index and create