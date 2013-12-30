/*
 * Wow comment
 * Much asterisk
 * Very comment-able
 * So testing
 */
var roy = require('./roy');

function bar() {
  // If you could just not put any comment here, that'd be great!
  console.log(roy.say());
  return ['If you don\'t', 'like this list', 'you\'re gonna have', 'a baaad time!'];
}

function foo() {
  console.log ('Sometimes, I just write things to the console, just knowing that no one will ever see it.');
  return 'I don\'t always write tests, but when I do, I make sure to include as many memes as possible!';
}

function baz() {
  return 2*3*3*3*9419*9467;
}

foo();
bar();
baz();
