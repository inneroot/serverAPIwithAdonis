'use strict'

const Testobj = use('App/Models/Testobj');
const AuthorizationService = use('App/Services/AuthorizationService');

class TestobjController {
  async index({auth}){
    const user = await auth.getUser();
    return await user.testobjs().fetch();
  }

  async create({auth, request}){
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

  async destroy({auth, request, params}){
    const user = await auth.getUser();
    const { id } = params;
    const testobj = await Testobj.find(id);
    AuthorizationService.verifyPermission(testobj, user);
    await testobj.delete();
    return testobj;
  }
}

module.exports = TestobjController
