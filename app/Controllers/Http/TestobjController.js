'use strict'

const Testobj = use('App/Models/Testobj');
const AuthorizationService = use('App/Services/AuthorizationService');

class TestobjController {
  async index({auth}){
    const user = await auth.getUser();
    return await user.testobjs().fetch();
  }

  async store({auth, request}){
    const user = await auth.getUser();
    const {title, content} = request.all();
    const testobj = new Testobj();
    testobj.fill({
      title,
      content
    });
    await user.testobjs().save(testobj);
    return testobj;
  }

  async show({auth, request, params}){
    const user = await auth.getUser();
    const { id } = params;
    const testobj = await Testobj.find(id);
    AuthorizationService.verifyPermission(testobj, user);
    return testobj;
  } 

  async destroy({auth, request, params}){
    const user = await auth.getUser();
    const { id } = params;
    const testobj = await Testobj.find(id);
    AuthorizationService.verifyPermission(testobj, user);
    await testobj.delete();
    return testobj;
  }

  async update({auth, request, params}){
    const user = await auth.getUser();
    const { id } = params;
    const testobj = await Testobj.find(id);
    AuthorizationService.verifyPermission(testobj, user);
    const {title, content} = request.all();
    testobj.merge({
      title,
      content
    });
    await testobj.save();
    return testobj;
  }
}

module.exports = TestobjController
