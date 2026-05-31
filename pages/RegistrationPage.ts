import {Page, Locator} from '@playwright/test'


export class RegistrationPage
{
    private readonly page:Page
    private readonly firstNametextbox:Locator
    private readonly lastNametextbox:Locator
    private readonly Emailtextbox:Locator
    private readonly Telephonetextbox:Locator
    private readonly password:Locator
    private readonly passwordConfirmtextbox:Locator
    private readonly subscriberadiobutton:Locator
    private readonly continueButton:Locator
    private readonly agreecheckbox:Locator
    private readonly successRegistrationMessage:Locator

    constructor(page:Page)
    {
        this.page = page
        this.firstNametextbox = this.page.locator("#input-firstname")
        this.lastNametextbox = this.page.locator("#input-lastname")
        this.Emailtextbox = this.page.locator("#input-email")
        this.Telephonetextbox = this.page.locator("#input-telephone")
        this.password = this.page.locator("#input-password")
        this.passwordConfirmtextbox = this.page.locator("#input-confirm")
        this.continueButton = this.page.locator("input[value='Continue']")
        this.agreecheckbox = this.page.locator("input[name='agree']")
        this.subscriberadiobutton = this.page.getByLabel('Yes', { exact: true })
        this.successRegistrationMessage = this.page.locator("#content h1")

    }

    async completeRegistration(userData:{
        firstName:string,
        lastName:string,
        email:string,
        telephone:string,
        password:string,
        confirmPassword:string
    }):Promise<void>
    {
        try{
        await this.firstNametextbox.fill(userData.firstName)
        await this.lastNametextbox.fill(userData.lastName)
        await this.Emailtextbox.fill(userData.email)
        await this.Telephonetextbox.fill(userData.telephone)
        await this.password.fill(userData.password)
        await this.passwordConfirmtextbox.fill(userData.confirmPassword)
        await this.subscriberadiobutton.check()
        await this.agreecheckbox.check()
        await this.continueButton.click()
        }catch(error)
        {
            console.log(`${error}`)
        }
    
    }

    async accountCreationSuccess():Promise<Boolean>
    {
        //Wait untill the success message is visible
        try{
                await this.successRegistrationMessage.waitFor({state:'visible'})
                return true
        }catch(error)
        {
        console.log(`Success message is not visible ${error}`)
        return false
        }
       
    }


}