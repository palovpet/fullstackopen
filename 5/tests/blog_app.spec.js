const { test, expect, beforeEach, describe } = require('@playwright/test')
const { before } = require('node:test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3008/api/testing/reset')
    await request.post('http://localhost:3008/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Login')
    await expect(locator).toBeVisible()
    
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'go in'}).click()

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('rupsu')
      await page.getByRole('button', { name: 'go in'}).click()

      await expect(page.getByText('wrong credentials')).toBeVisible()  
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'go in'}).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog'}).click()
      await page.getByTestId('title').fill('Koodia')
      await page.getByTestId('author').fill('Masa L')
      await page.getByTestId('url').fill('www.code.com')
      await page.getByRole('button', { name: 'save'}).click()
      await expect(page.getByText('added')).toBeVisible() 
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view'}).last().click()
      await expect(page.getByText('was liked')).toBeVisible() 
    })

  })
})