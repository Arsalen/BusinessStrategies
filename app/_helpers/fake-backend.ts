import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {User} from '../_models/index'
import {Message} from '../_models/index'

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    
    
    // array in local storage users waiting to be registered
    let userswaiting: any[] = JSON.parse(localStorage.getItem('userswaiting')) || [];

    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    // array in local storage for registered messages
    let messages: any[] = JSON.parse(localStorage.getItem('messages')) || [];
    // array in local storage for registered admins
    let admins: any[] = JSON.parse(localStorage.getItem('admins')) || [];
    


    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // authenticate 
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());


// if(users.length)
// {alert(params.email)
// alert(users[0].email)
// alert(params.password)
// alert(users[0].password)}

                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.email === params.email && user.password === params.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            id: user.id,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            company: user.company,
                            function: user.function,
                            sector: user.sector,
                            admn: user.admn,
                            held: user.held,
                            token: 'fake-jwt-token'
                        }
                    })));
                } else {
                    // else return 400 bad request
                    connection.mockError(new Error('E-mail or password is incorrect'));
                }

                return;
            }






            // get users waiting
            if (connection.request.url.endsWith('/api/userswaiting') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: userswaiting })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }
                return;
            }

            // get users
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }
                return;
            }

            // get user by id
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // update user
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Put) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    // alert('put succed')
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let newUser = JSON.parse(connection.request.getBody());
                    let matchedUsers = users.filter(user => { return user.id === newUser.id });
                    let matchedUsersWaiting = userswaiting.filter(user => { return user.id === newUser.id });
                    
                if (matchedUsers.length || matchedUsersWaiting.length) {
                    // alert('put succed')
                    alert(matchedUsers.length)
                    alert(matchedUsersWaiting.length)
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let checkadmin = JSON.parse(localStorage.getItem('currentUser'));
                        if (checkadmin.admn == true) {
                            if(matchedUsers.length)
                                {
                                    matchedUsers[0].email = newUser.email; matchedUsers[0].lastName = newUser.lastName; matchedUsers[0].firstName = newUser.firstName; matchedUsers[0].company = newUser.company; matchedUsers[0].function = newUser.function; matchedUsers[0].sector = newUser.sector; 
                                        alert('updating users table as admin');
                                        localStorage.setItem('users', JSON.stringify(users));
                                        // respond 200 OK with user
                                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: matchedUsers[0]  })));
                                }else if(matchedUsersWaiting.length)
                                    {
                                        newUser.held = false
                                        users.push(newUser)
                                        for (let i = 0; i < userswaiting.length; i++) {
                        let userwaiting = userswaiting[i];
                        if (userwaiting.id === id) {
                            // delete user
                            userswaiting.splice(i, 1);
                            // matchedUsers[0].function = newUser.function;
                            localStorage.setItem('userswaiting', JSON.stringify(userswaiting));
                            break;
                        }
                    }
                                        alert('updating users table as admin');
                                        localStorage.setItem('users', JSON.stringify(users));
                                        // respond 200 OK with user
                                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: matchedUsersWaiting[0]  })));
                                    }



                                        
                                }else {
                                    let pswrdUsers = users.filter(user => { return user.password === newUser.oldpassword });
                                        if (pswrdUsers.length){
                                                                matchedUsers[0].email = newUser.email; matchedUsers[0].lastName = newUser.lastName; matchedUsers[0].firstName = newUser.firstName; matchedUsers[0].company = newUser.company; matchedUsers[0].function = newUser.function; matchedUsers[0].sector = newUser.sector; matchedUsers[0].password = newUser.password;
                                                                alert('updating users table as user');
                                                                localStorage.setItem('users', JSON.stringify(users));
                                                                // respond 200 OK with user
                                                                connection.mockRespond(new Response(new ResponseOptions(                                                                { status: 200, body: matchedUsers[0]  })));
                                                                }else {
                                                                    // else return 400 bad request
                                                                    connection.mockError(new Error('password is                                                                             incorrect'));
                                                                    }
                                        }
                                }
    }
                 else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }


            // create user waiting
            if (connection.request.url.endsWith('/api/userswaiting') && connection.request.method === RequestMethod.Post) {
                // get new user object from post body
                let newUser = JSON.parse(connection.request.getBody());

                // validation
                let duplicateUser = userswaiting.filter(userwaiting => { return userwaiting.email === newUser.email; }).length;
                if (duplicateUser) {
                    return connection.mockError(new Error('email "' + newUser.email + '" is already taken'));
                }

                // save new user
                newUser.id = userswaiting.length + 1;
                newUser.admn = false;
                newUser.held = true
                userswaiting.push(newUser);
                localStorage.setItem('userswaiting', JSON.stringify(userswaiting));                

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }

            // create user
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
                // get new user object from post body
                let newUser = JSON.parse(connection.request.getBody());

                // validation
                let duplicateUser = users.filter(user => { return user.email === newUser.email; }).length;
                if (duplicateUser) {
                    return connection.mockError(new Error('email "' + newUser.email + '" is already taken'));
                }

                // save new user
                newUser.id = users.length + 1;
                newUser.admn = false;
                newUser.held = false;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));                

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }



            // delete user
            if (connection.request.url.match(/\/api\/userswaiting\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < userswaiting.length; i++) {
                        let userwaiting = userswaiting[i];
                        if (userwaiting.id === id) {
                            // delete user
                            userswaiting.splice(i, 1);
                            localStorage.setItem('userswaiting', JSON.stringify(userswaiting));
                            break;
                        }
                    }
                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }





            // delete user
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }


//----------------------------------------------------------------------------------------------------------------------------------------------------


// authenticate admin
            if (connection.request.url.endsWith('/api/authenticateAdmin') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());

                // find if any admin matches login credentials
                let filteredAdmins = admins.filter(admin => {
                    return admin.email === params.email && admin.password === params.password;
                });

                if (filteredAdmins.length) {
                    // if login details are valid return 200 OK with admin details and fake jwt token
                    let admin = filteredAdmins[0];
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            id: admin.id,
                            email: admin.email,
                            firstName: admin.firstName,
                            lastName: admin.lastName,
                            admn: admin.admn,
                            token: 'fake-jwt-token'
                        }
                    })));
                } else {
                    // else return 400 bad request
                    connection.mockError(new Error('email or password is incorrect'));
                }

                return;
            }

            // get admins
            if (connection.request.url.endsWith('/api/admins') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: admins })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }
                return;
            }

            // get admin by id
            if (connection.request.url.match(/\/api\/admins\/\d+$/) && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return admin if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find admin by id in admins array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedAdmins = admins.filter(admin => { return admin.id === id; });
                    let admin = matchedAdmins.length ? matchedAdmins[0] : null;

                    // respond 200 OK with admin
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: admin })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

        // create admin
            if (connection.request.url.endsWith('/api/admins') && connection.request.method === RequestMethod.Post) {
                // get new admin object from post body
                let newAdmin = JSON.parse(connection.request.getBody());

                // validation
                let duplicateAdmin = admins.filter(admin => { return admin.email === newAdmin.email; }).length;
                if (duplicateAdmin) {
                    return connection.mockError(new Error('email "' + newAdmin.email + '" is already taken'));
                }

                // save new admin
                newAdmin.id = admins.length + 1;
                newAdmin.admn = true;
                admins.push(newAdmin);
                localStorage.setItem('admins', JSON.stringify(admins));                

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }

          // delete admin
            if (connection.request.url.match(/\/api\/admins\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < admins.length; i++) {
                        let admin = admins[i];
                        if (admin.id === id) {
                            // delete admin
                            admins.splice(i, 1);
                            localStorage.setItem('admins', JSON.stringify(admins));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }


            // update admin
            if (connection.request.url.match(/\/api\/admins\/\d+$/) && connection.request.method === RequestMethod.Put) {
                // check for fake auth token in header and return admin if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find admin by id in admins array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let newAdmin = JSON.parse(connection.request.getBody());
                    let matchedAdmins = admins.filter(admin => { return admin.id === newAdmin.id && admin.password === newAdmin.oldpassword });

                if (matchedAdmins.length) {
                    // if login details are valid return 200 OK with admin details and fake jwt token
                    matchedAdmins[0].email = newAdmin.email; matchedAdmins[0].lastName = newAdmin.lastName; matchedAdmins[0].firstName = newAdmin.firstName; matchedAdmins[0].password = newAdmin.password;
    alert('updating admins table');
                    localStorage.setItem('admins', JSON.stringify(admins));
                    // respond 200 OK with admin
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: matchedAdmins[0]  })));
                    }
                 else {
                    // else return 400 bad request
                    connection.mockError(new Error('password is incorrect'));
                }

    }
                 else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }



//-------------------------------------------------------------------------------------------------------------------------------------------------


            // get messages
            if (connection.request.url.endsWith('/api/messages') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: messages })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }
                return;
            }

            // create message
            if (connection.request.url.endsWith('/api/messages') && connection.request.method === RequestMethod.Post) {
                // get new message object from post body
                // alert('hello message')
                let newMessage = JSON.parse(connection.request.getBody());                
                // save new message
                newMessage.id = messages.length + 1;
                messages.push(newMessage);
                localStorage.setItem('messages', JSON.stringify(messages));
                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                return;
            }
            // connection.request.url.match(/\/api\/admins\/\d+$/) && connection.request.method === RequestMethod.Delete

            if (connection.request.url.match(/\/api\/messages\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < messages.length; i++) {
                        let message = messages[i];
                        if (message.id === id) {
                            // delete admin
                            messages.splice(i, 1);
                            localStorage.setItem('messages', JSON.stringify(messages));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            




//-------------------------------------------------------------------------------------------------------------------------------------------------


            // pass through any requests not handled above
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });

        }, 500);

    });

    return new Http(backend, options);
};

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};