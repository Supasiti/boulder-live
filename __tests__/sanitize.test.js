const models = require('../models');
const sanitize = require('../services/sanitize');


describe('services/santiize', () => {

  // when pass an instance of Model
  it('should return a cleaned object when an instance of Tag is passed', () => {

    const input = models.User.build({ 
      username: "hello",
      email: "asdf@email.com",
      password: "asdfasjdfl;k" 
    })
    const expected = { 
      id: null,
      username: "hello",
      email: "asdf@email.com",
      password: "asdfasjdfl;k" 
    }

    const result = sanitize(input);

    expect(result).toEqual(expected);
  })

  // when pass an array of instances of Model
  it('should return a list of cleaned objects when an array of Tags is passed', () => {

    const input = models.User.build([
      { 
        username: "hello",
        email: "asdf@email.com",
        password: "asdfasjdfl;k"  
      },
      { 
        username: "world",
        email: "aehh@email.com",
        password: "asdfasjdfl;k" 
      },
    ])
    const expected = [
      { 
        id: null,
        username: "hello",
        email: "asdf@email.com",
        password: "asdfasjdfl;k"
      },
      { 
        id: null,
        username: "world",
        email: "aehh@email.com",
        password: "asdfasjdfl;k"  
      }
    ]

    const result = sanitize(input);

    expect(result).toEqual(expect.arrayContaining(expected));
  })

  // when pass a wrong argument
  it('throw if you pass a wrong type of argument', () => {

    const input = { 
      username: "world",
      email: "aehh@email.com",
      password: "asdfasjdfl;k"  
    };
    
    expect(() => {sanitize(input);}).toThrow();
  })
})
