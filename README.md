1.Create Project
npx create-react-app@14 my-app
2.Analze Project
cd my-app
* Project Structure
  app
    |___fonts
    |___api
        |   |__auth
        |          |__[...auth]
        |                     |__route.ts
        |          |__register
        |                    |__route.ts
        |          |__reset-password
        |                    |__route.ts
        |          |__verify-otp
        |                    |__route.ts
        |          |__verify-email
        |                    |__route.ts
        |          |__profile
        |                    |__update
        |                            |_route.ts
        |                    |__route.ts
        |          |__users
        |                    |__route.ts
        |_books
            |__chapters
            |__pages
            |__sections
        |_departments
        |_catelogues
        |_vlogs
        |_comments
        |_favorites
        |_donations
        |_medias
    |___Dashboard
                |__Users (Admin)
                |__Books (Mordirector)
                |       |__Chapters
                |       |__Pages
                |       |__Sections
                |__Departments
                |            |__Catelogues
                |__Vlogs
                |__donations
                |__ComunityMedia
    |___auth
            |__login
            |__signin
            |__register
            |__reset-password
            |__verify-otp
    |___Components
                  |___Donate.tsx
                  |___LoginForm.tsx
                  |___SigninForm.tsx
                  |___RegisterForm.tsx
                  |___ResetPassword.tsx
                  |___VerifyOtp.tsx
                  |___ReadingPage.tsx
                  |___CatelogueCard.tsx
                  |___VlogsCard.tsx
                  |___FavoriteButton.tsx
                  |___ShareButton.tsx
                  |___Translation.tsx
                  |___Search.tsx
                  |___DonateButton.tsx
                  |___MediaCard.tsx
    |___Pages
            |___Vlogs
            |___Contact
            |___Cataglogues
                          |_[[...version]]
                                         |_page.tsx
            |___Mission
                       |_page.tsx
            |___About Us
                        |_page.tsx
            |___Reading
                       |__[[...chapter]]
                                       |_page.tsx
            |___page.tsx
    |___Images
    |___Utils
    |___layout.tsx
    |___page.tsx
    |___error.tsx
    |___loading.tsx
    |___not-found.tsx
  lib
    |__auth.ts
    |__authService.ts
    |__json.ts
  Untils
        |__apiHelpers.ts
        |__schema.ts
        |__validateForm.ts
        |__generateSlug.ts
  Type
        |__types.ts
  prisma
        |__migrations
        |__schema.prisma
        |__client.ts
  .env
  middleware.ts


