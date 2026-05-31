import { Page, Locator } from "@playwright/test";
import { HomePage } from "./HomePage";

export class LogoutPage
{
    private readonly page:Page
    private readonly continue:Locator
    private readonly logout_message:Locator

    constructor(page:Page)
    {
        this.page = page
        this.continue = this.page.getByRole('link', { name: 'Continue' })
        this.logout_message = this.page.locator("#content h1")
    }

    async clickContinue():Promise<HomePage>
    {
       await this.continue.click()
       return new HomePage(this.page)
    }

    async iscontinuebuttonVisible():Promise<boolean>
    {
          let isvisible = this.continue.isVisible()
          return isvisible
    }

}