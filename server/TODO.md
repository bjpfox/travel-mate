PLAN FOR TONIGHT:
do readme
tidy upcode/rm comments
write a demo script
that 404 error isthatfixable?whydo we even goto login route? is it needed?

WED:
1. have a readme file, add final snapshots etc
1. tidy up code, rm comments
1. record demo

IF TIME:
1. if time-maybe get photos going





*-*-*-*-*-*-*-*-*-*-
DEMO NOTES
*-*-*-*-*-*-*-*-*-*-

THINGS TO WATCH FOR IN DEMO
enter extra space to get state update, it seems to miss last char but i think this may just be ur console log 
lat / long is cast as string, may need to convert to ensure stays as num

some things areclickable inmaps?maybe run demo with obivous stufflike Hyde Park,googleseemstobe able tofind these 

CODE I AM PROUD OF
the editing editable and getting that to update state


HOW I STRETCHED MYSELF
learning more chakraui stuff


PRESENTATION NOTES:
Challenges: 
On the non  technical side i had some personal challenges with project 4
travelling, jetlag, no second screen,etc
then catching covid
then having laptop stolen
using anotherone setup,keyboard having broken keys
probably notthe most developed, but in termsofthe challenges im actuallyreallyhappyto have madeitand gotten an MVP


Technical:
ChatGPT
getting worse? wasnt 100% following schema 
Limitations ofchakra UI but being too late to change tech stack once commited
googlemapsreact no longer maitnained, out ofdate for react 18, code examplesbroken, limited functionality e.g. InfoWindows
not always loading for some reason, sometimes have to hit refresh
maybewilltry theother one
testing needed to refactor eg moving coordinatesinto util but kind ofmade more sense, can see merit of TDD or at least thinking abouthowit willbe tested when you write code
different versions ofthingslikereact 
API stuff websites notworking
bugs
when click edtiable it expands, thenngoes back,couldnt resolve this

hard to test js util files
ended up using babel to translate js to jsx to enable testing
Howdoes this work?


*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
BABEL explanation - did I use this in the end?
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

Babel is a tool that allows you to write modern JavaScript code using the latest language features (such as import/export syntax) and convert it into a compatible format that can run in older environments or environments that do not natively support those features.

When you write code using modern JavaScript features, like the import/export syntax, it is considered ES modules. However, Jest, which is the testing framework you're using, doesn't natively understand ES modules.

Babel comes to the rescue by acting as a transpiler. A transpiler is a tool that converts code from one language version to another. In the case of Babel, it takes your ES modules code and transforms it into an equivalent version using older JavaScript syntax called CommonJS modules (require/module.exports). CommonJS modules are the format that Jest understands.
In summary, Babel is a tool that converts modern JavaScript code (ES modules) into an older format (CommonJS modules) that can be understood by Jest. It allows you to use the latest language features while ensuring compatibility with your test environment.


*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
Future work:
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
map labels to render if titles are changed
 

*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
TODO after demoing:
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
Fix commit history where it shows wrong username due to borrowing Erdi's Macbook
pass state from trips to itin to avoid fetching trip info


*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
TODO if time:
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

Delete itinerary - WORKS but seems to make empty... are these still in table? add error get itin by id is empty / blank

Add those alert message things

Add a button to allow fetching a new itin if trip was edited (decided to make automatic due to response time, and API cost, maybe itsa paid feature)



*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
SUPERCEDED NOTES CAN IGNORE
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
GPT actions:
Create/edit trip to call new functions that fetch itin response as JSON


*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
DONE
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
ITINERARIES - DONE 
Create itinerary - WORKS
Edit itinerary - WORKS 
Delete itinerary - WORKS 
View itinerary / get itin by trip ID - WORKS 

TRIPS - DONE
Create trip - WORKS
Get all trips from logged in user (view all trips) - WORKS
Get trip by id (view a trip) - WORKS
Edit trip - WORKS
Delete trip - WORKS


USERS - DONE
Create user working 
Cant think of any others needed for MVP?
If time: add a delete user option


SESSIONS - DONE
log in, log out, and check if user working are all working

ARCHIVED NOTES:
Create itinerary - WORKS, but check what is going on with id numbers

*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
DONE
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

<!-- HAD DONE - ALL DONE -->
1. connect itin frontend to db backend rather than use mock data 60mins - DONE for read
2. write the chat GPT code to fetch itin data -  DONE
and store it in db,whenvertrip is created - DONE
3. get it so we can also read back the chatGPT data into state and render it 30-60mins - DONE
4. create the basic google maps component - DONE
<!-- HAD NOT DONE -->
1. connect itin frontend to db backend rather than use mock data 60mins - DONE for read
TODO for delete - delete button press to update state - DONE 
TODO for update - editing text to update state - DONE 
TODO for add - create new empty editable card (can have placeholders) to update state - DONE
TODO for update/delete/add - save button to stringify and send PUT request with updated list - DONE 

*-*-*-*-*-*-*-*-*-*-
HOURS PLANNED
*-*-*-*-*-*-*-*-*-*-
3hrs mon
3hrs tues
3hrs wed, demo and send


*-*-*-*-*-*-*-*-*-*-
TODO:
*-*-*-*-*-*-*-*-*-*-

MON:
1. get maps showing all markers
https://react-google-maps-api-docs.netlify.app/#marker
is it just centering map, showing some markers, and ideally adding some text 
- MARKERS ARE SHOWING
- JUST NEED TO ADD A CENTER FUNCTION OR DOES THIS AUTO CENTER? No it wont. GPT had another approach using bounds as well, butlookscomplicated - DONE

1. loading page on fetch itin? DONE 

1. get signup working-copyfrom a lab? 1hr - DONE

1. write some tests - do this for...  look at react testing lab and get ideas,maybe could do for centering the coordinates for long/lat, could do a mock get request render test: 2hrs DONE

TUE:
1. tidy up visuals - CSS styles and colours, if time icons

GENERAL:
add colours

ITIN:
center map
fix itin colours/padding/size
bold the heading forcountry 

ALL PAGES:
fix blackbox thing appraring at bottom



how to do long/lat? if too complex, just makelong lat na and dont render theseon map who could be bothered getting thisinfo anyway?

BUGS? FIX IF TIME:
if create trip through postman, data ends up in db
but if we create trip through form it gets stuck...why..seems to work now..why?

