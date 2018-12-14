'use strict'

const Testobj = use('App/Models/Testobj');

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
}

module.exports = TestobjController
