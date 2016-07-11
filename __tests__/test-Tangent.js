jest.disableAutomock();
import Anecdote from '../src/lib/Anecdote';
import Tangent from '../src/lib/Tangent';
import TangentChild from '../src/lib/TangentChild';


describe('Tangent', () => {
  it('extends Anecdote', () => {
    let stuff = {content: '', meta: {title: "Hi"}};
    let tangent = new Tangent(stuff)
    expect(tangent.title).toEqual('Hi')
  });

  xit('has additional parameter in constructor for directory path', () =>{

  });

  xit('has children (???)', () => {

  });
})

describe('TangentChild', () => {
  it('extends Tangent', () => {
    let stuff = {content: '', meta: {title: "Hi"}};
    let precedent = new Tangent(stuff)
    let tchild = new TangentChild(stuff, precedent)
    expect(tchild.title).toEqual('Hi')
  });

  xit('must be initialized with either sibling/parent(?) Tangent', () => {

  });

  xit('it inherits source directory from precedent Tangent/TangentChild', () =>{
    
  })
})
