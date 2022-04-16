## Recipe Corner
Recipe corner is my graduation project for the Angular course held by [SoftUni](https://softuni.bg) . The idea behind the site is to create a social recipe site where the recipe picture draws more attention than the recipe itself.
Live demo of the website can be accessed thanks to [heroku](https://heroku.com) on the following link [https://recipecorner.herokuapp.com/](https://recipecorner.herokuapp.com/)

## Tech Stack
The site is build utilizing the **MEAN** technology stack (**M**ongo, **E**xpress, **A**ngular and **N**ode). 
For persistence of the data a combination of [MongoDBAtlass](https://www.mongodb.com/atlas) for storing the database and [Firebase Storage](https://firebase.google.com/) for file keeping is used.


## User capabilities overview

 **Gues users** can

 - view the homepage
	 	 - filter by popularity/newest
 - search for content
 		 - filter said content by date
 - browse content by category
		 - filter said content by date
 - view details page of each submission
 - view profile pages of registered users
 - view submission page of registered users
 - view favourites page of registered users
 - login and register

**Registered users** can

 - access all the content **Guest users** can
 - submit new recipes
 - edit/delete the recipes they have created
 - follow/unfollow other users 
 - favourite/unfavourite other users content
 - access a **Feed** page that shows only content from users they follow
 		 - filter said content by date
 - access a settings page where they can change their biography/avatars

 ## Frontend architecture overview

**Dependacies used**

 - *Angular CLI*  
		 - main building block of the whole application and all the goodies that come with it. 
 - *Thats it no other third party dependency*

 **Custom components used**
Can be divided in a few groups (**views**,**components**,**services**)

***Views*** - containers are the wrapper components for the different routes (could be considered pages)

 - **About-page** - component holding static about data
 -  **Contact-page** - component containing a contact form (actually works)
 -  **Details-page** - component used to display a single submission entry
			 - interacts with the submission service to load and display the data 
			 - can accept data through state to avoid unnecessary api calls  
 -  **Feed-page** - component used to display a users feed of submissions from people they follow
			 - interacts with the submission service and with the user state
 -  **Home** - component used to display feed of all the content
			 - interacts with the submission service and with the userContext to load the data and utilizes the ***Carousel*** component to display it
 -  **Login** - component used to contain the login form
 -  **NotFound** - stateless component holding the 404 error
 -  **Profile** - statull component that display the user's latest submission and favourites their statistics like view counts, subscriber count as well as their bio.
 -  **Register** - component used to contain the register form
 -  **Search** -component that interacts with the submission service to get the search results 
 -  **Settings** component that holds a form allowing the user to change their biography/avatar.
 - **Create** component that holds a form allowing the user to submit new content.
 -  **Category** component that interacts with the submission service to get the posts by that category
 - **UserFavourites** component displaying data about the user and all their favourites
 - **UserSubmissions** component displaying data about the user and all their submissions

 ***Components*** - the list is not exhaustive  will include a few of the most notable.

 - **Recipe-card** - the bread and butter of the application. it is the main way submission data is presented to the user. Takes in the data for a single submission and presents at a glance to the user a thumbnail of the picture, the title, the submitter and an option to favourite then and there.
 - **Author-contros** - a small component that takes in the user and the submission and handles the editing and deleting logic of said submission.
 - **Edit-submission** - combied with the **Author-controls** component present a popup on top of the current submission for the user to edit without navigating away from the page

 - **FavouriteButton** - handles the logic behind favouriting and showing whether something has been or not favourited. Optionally takes an argument about the appearance so it can be used as a smal one star button in the **Recipe** or a big text button in the **Details** container.
 - **Header** - self explanetory
 - **Footer** - self explanetory

***Services*** - the brains of the operation, handle all API calls

 - **Submission-service** - all api calls relating to submissions
 - **User-service** - all api calls relating to user api calls not handle by **auth-service**
 - **Auth-service** - handles all auth related api calls
 - **Token-storage-service** - handles the userData storage and retrieval (ended up being a bit of catch all)

***Interfaces*** 

 - **IRecipeMini** - the main type of recipe data used throught the app

***Misc*** 

 - **Auth.interceptor** - catches all outgoing http calls and amends the auth token if it exist