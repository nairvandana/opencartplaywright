import {Page, expect, Locator} from '@playwright/test'
import { LoginPage } from './LoginPage'

export class HomePage
{
    //locators
    private readonly page:Page
    private readonly myAccountLink: Locator
    private readonly RegisterLink: Locator
    private readonly LoginLink:Locator
    private readonly searchbar:Locator
    private readonly searchButton:Locator

    constructor(page:Page)
    {
        this.page = page
        this.myAccountLink = this.page.locator("ul li a span").filter({hasText:"My Account"})
        this.RegisterLink = this.page.getByRole('link', { name: 'Register' })
        this.LoginLink = this.page.locator("ul.dropdown-menu-right li:nth-child(2) a")
        this.searchButton = this.page.locator("button.btn-default")
        this.searchbar = this.page.getByRole('textbox', { name: 'Search' })
    }

    //Actions in this page
    async isLandedonHomePage():Promise<boolean>
    {
          let pageTitle:string = await this.page.title()
          if(pageTitle=="Your Store")
            return true
          else
            return false
    }


    async clickmyAccount()
    {
        try{

            await this.myAccountLink.click()
        }catch(error)
        {
            console.log(error)
            throw error
        }
    }
    
    async searchProduct(productName:string)
    {
        try{

            await this.searchbar.fill(productName)
        }catch(error)
        {
            console.log(`product is not searched:${error}`)
            throw error
        }
        
    }


    async clickLogin():Promise<LoginPage>
    {
        try{
                  await this.LoginLink.click()
                  return new LoginPage(this.page)
        }catch(error)
        {
            console.log(`Login click failed with ${error}`)
            throw error
        }
       
    }

    
    async clickSearch()
    {
        try{
                  await this.searchButton.click()
        }catch(error)
        {
            console.log(`Search failed with ${error}`)
            throw error
        }
    }


    async clickRegister()
    {
        try{
                  await this.RegisterLink.click()
        }catch(error)
        {
            console.log(`Register failed with ${error}`)
            throw error
        }
    }



}