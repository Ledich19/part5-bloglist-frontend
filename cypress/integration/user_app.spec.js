describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Aleksandr',
      username: 'owner',
      password: '55555',
    }
    cy.createUser(user)
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('owner')
      cy.get('#password').type('55555')
        .parent().parent().find('button').click()
      cy.contains('Aleksandr logged in')

      cy.get('.info').should('contain', 'login ;)')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('owner')
      cy.get('#password').type('wrong')
        .parent().parent().find('button').click()
      cy.get('html').should('not.contain', 'Aleksandr logged in')

      cy.get('.error').should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(190, 21, 21)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'owner',
        password: '55555',
      })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('this is testing blog')
      cy.get('#author').type('developer')
      cy.get('#url').type('http://localhost:3000/')
      cy.get('#blogForm button').click()

      cy.get('.info').should('contain', 'a new blog this is testing blog by developer')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.blog').contains('this is testing blog developer')
    })
  })

  describe('whan blog added', function () {
    beforeEach(function () {
      cy.login({
        username: 'owner',
        password: '55555',
      })
      const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
      }
      cy.createBlog(blog)
    })

    it('can the user like the blog', function () {
      cy.contains('view').click()
      cy.get('.likes').should('contain', 0)
      cy.contains('likes').click()
      cy.get('.likes').should('contain', 1)
    })

    it('blog can only be deleted by the owner', function () {
      const user = {
        name: 'some name',
        username: 'guest',
        password: '66666',
      }
      cy.createUser(user)
      cy.contains('logout').click()
      cy.login({
        username: 'guest',
        password: '66666',
      })
        .get('.blogMin button').click()
        .get('.blog').should('not.contain', 'remove')
    })

    it('blogs are ranked by likes from highest to lowest', function () {
      const blogs = [{
        title: 'first blog',
        author: 'Michael Chan',
        url: 'https://first.com/',
      }, {
        title: 'second blog',
        author: 'Michael Chan',
        url: 'https://second.com/',
        likes: 6
      }, {
        title: 'the third blog',
        author: 'Michael Chan',
        url: 'https://third.com/',
      }]
      cy.createBlog(blogs[0])
      cy.createBlog(blogs[1])
      cy.createBlog(blogs[2])

      cy.get('.blogMin button').then((buttons) => {
        buttons.map((i, element) => {
          return  element.click()
        })
      })

      cy.contains('first blog').parent().contains('likes').click()
        .get('.likes').should('contain', 1)
      cy.contains('first blog').parent().contains('likes').click()
        .get('.likes').should('contain', 2)
      cy.contains('first blog').parent().contains('likes').click()
        .get('.likes').should('contain', 3)

      cy.contains('second blog').parent().contains('likes').click()
        .get('.likes').should('contain', 1)
      cy.contains('second blog').parent().contains('likes').click()
        .get('.likes').should('contain', 2)

      cy.contains('the third blog').parent().contains('likes').click()
        .get('.likes').should('contain', 1)

      cy.get('.likes').then((blogs) => {
        expect(blogs).to.have.length(4)
        expect(blogs[0]).to.contain(3)
        expect(blogs[1]).to.contain(2)
        expect(blogs[2]).to.contain(1)
        expect(blogs[3]).to.contain(0)
      })
    })

  })
})