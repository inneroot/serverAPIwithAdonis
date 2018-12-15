'use strict'

const Testobj = use('App/Models/Testobj');
const Quiz = use('App/Models/Quiz');
const AuthorizationService = use('App/Services/AuthorizationService');

class QuizController {

  async index({auth, request, params}){
    const user = await auth.getUser();
    const { tests_id } = params;    
    const testobj = await Testobj.find(tests_id);
    AuthorizationService.verifyPermission(testobj, user);
    return testobj.quizzes().fetch();
  }

  async store({auth, request, params}){
    const user = await auth.getUser();
    const { question, answers } = request.all();
    const { tests_id } = params;    
    const testobj = await Testobj.find(tests_id);
    AuthorizationService.verifyPermission(testobj, user);
    const quiz = new Quiz();
    quiz.fill({
      question,
      answers
    });
    await testobj.quizzes().save(quiz);
    return quiz;
  }

  async destroy({auth, request, params}){
    const user = await auth.getUser();
    const { id } = params;
    const quiz = await Quiz.find(id);
    const testobj = await quiz.testobj().fetch();
    AuthorizationService.verifyPermission(testobj, user);
    await quiz.delete();
    return quiz;
  }

  async update({auth, request, params}){
    const user = await auth.getUser();
    const { id } = params;
    const quiz = await Quiz.find(id);
    const testobj = await quiz.testobj().fetch();
    AuthorizationService.verifyPermission(testobj, user);
    const { question, answers} = request.all();
    quiz.merge({
      question,
      answers
    });
    await quiz.save();
    return quiz;
  }
}

module.exports = QuizController
