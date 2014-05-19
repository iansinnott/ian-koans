describe('JavaScript', function() {

  describe('DOM Nodes', function() {

    it("Native DOM functions return array-like objects.", function() {
      var divs1 = document.querySelectorAll('div'),
          divs2 = document.getElementsByTagName('div'),
          divs3 = document.getElementsByClassName('div'),
          divs4 = document.getElementsByName('div');

      divs1.should.not.be.an('array');
      divs1.should.be.an('object');

      divs2.should.not.be.an('array');
      divs2.should.be.an('object');

      divs3.should.not.be.an('array');
      divs3.should.be.an('object');

      divs4.should.not.be.an('array');
      divs4.should.be.an('object');
    });

    it("querySelectorAll and getElementsByName both return a NodeList", function() {
      var divs1 = document.querySelectorAll('div'),
          divs2 = document.getElementsByName('div');

      divs1.toString().should.equal('[object NodeList]');
      divs2.toString().should.equal('[object NodeList]');
    });

    it('getElementsByTagName and getElementsByClassName both return an HTMLCollection', function() {
      var divs1 = document.getElementsByTagName('div'),
          divs2 = document.getElementsByClassName('div');

      divs1.toString().should.equal('[object HTMLCollection]');
      divs2.toString().should.equal('[object HTMLCollection]');
    });
  });

  describe('Objects', function() {

    it("Are assigned by reference", function() {
      var obj = { one: 'one', two: 'many' },
          a = { one: 'one', two: 'many' },
          b = obj;

      a.should.not.equal(obj);
      b.should.not.equal(a);
      b.should.equal(obj);

      delete b.one;

      obj.should.not.have.property('one');
      a.should.have.property('one');

    });

    it("A shallow clone only clones the top level", function() {
      var person = {
        name: 'Ram',
        hobbies: {
          cooking: {
            proficiency: 'good',
            timeSpent: 45
          },
          reading: {
            proficiency: 'awesome',
            timeSpent: 130
          }
        }
      };

      var shallowJohn = _.clone(person);

      shallowJohn.should.not.equal(person);
      shallowJohn.hobbies.should.equal(person.hobbies);

      should.not.exist(person.hobbies.skiing);

      shallowJohn.hobbies.skiing = { proficiency: 'rad' };

      person.hobbies.skiing.proficiency.should.equal('rad');

      delete person.hobbies.skiing;

      should.not.exist(shallowJohn.hobbies.skiing);

    });

    it("A deep clone clones the entire object tree", function() {
      var person = {
        name: 'Ram',
        hobbies: {
          cooking: {
            proficiency: 'good',
            timeSpent: 45
          },
          reading: {
            proficiency: 'awesome',
            timeSpent: 130
          }
        }
      };

      var deepJohn = _.cloneDeep(person);

      deepJohn.hobbies.should.not.equal(person.hobbies);
      deepJohn.hobbies.should.deep.equal(person.hobbies);

      deepJohn.hobbies.skiing = { proficiency: 'rad' };

      should.not.exist(person.hobbies.skiing);
      should.exist(deepJohn.hobbies.skiing);

    });

  });

});
