import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import { render, fireEvent } from '@testing-library/react'
import {  } from '@testing-library/dom'

test('blog displays the title and author , but not display its URL or likes',() => {
  const blog = {
    id:'5a422a851b54a676234d17f7title',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '60e85e17ffc9ad36d43680ac',
  }
  const component = render(
    <Blog blog={blog} />
  )
  const blogView = component.container.querySelector('.blogView')
  const blogMin = component.container.querySelector('.blogMin')
  expect(blogMin).toHaveTextContent('React patterns')
  expect(blogMin).toHaveTextContent('Michael Chan')
  expect(blogMin).not.toHaveTextContent('https://reactpatterns.com/e')
  expect(blogMin).not.toHaveTextContent(7)
  expect(blogView).toHaveStyle('display: none')
})

test('when you click the view button the url and likes are displayed',() => {
  const blog = {
    id:'5a422a851b54a676234d17f7title',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '60e85e17ffc9ad36d43680ac',
  }
  const component = render(
    <Blog blog={blog} />
  )
  const button = component.getByText('view')
  fireEvent.click(button)

  const blogView = component.container.querySelector('.blogView')
  expect(blogView).toHaveTextContent('React patterns')
  expect(blogView).toHaveTextContent('Michael Chan')
  expect(blogView).toHaveTextContent('https://reactpatterns.com/')
  expect(blogView).toHaveTextContent(7)
})

test('when double clicked, two handlers will be called',() => {
  const blog = {
    id:'5a422a851b54a676234d17f7title',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '60e85e17ffc9ad36d43680ac',
  }
  const handleLike = jest.fn()

  const component = render(
    <Blog blog={blog}
      handleLike={handleLike} />
  )
  const button = component.getByText('view')
  fireEvent.click(button)
  const buttonLikes = component.getByText('likes')
  fireEvent.click(buttonLikes)
  fireEvent.click(buttonLikes)

  expect(handleLike.mock.calls).toHaveLength(2)
})