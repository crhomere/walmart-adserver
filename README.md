# Walmart Advertisement Platform

The MVP of this ad platform focuses on core functionality for an ad server, enabling seamless ad distribution from advertisers to publishers. It provides insights into prominent ad servers like Google Ads, covering campaign creation and efficient ad dissemination. Users gain a foundation to understand the ecosystem and effectively manage campaigns, optimize ad placements, and maximize revenue potential. This MVP empowers advertisers, campaigns, and ad items, driving success in digital advertising.

## Set Up  

*The ad server utilizes the MongoDB database.
Prior to starting, ensure that MongoDB is installed on Localhost!*

- MongoDB v6.06

```bash
$ git clone https://github.com/crhomere/walmart-adserver/
$ cd walmart-adserver
$ npm install
$ npm run build
$ npm run start
```
## Introduction to Ad Servers
Ad servers play a crucial role in the world of online advertising. One well-known ad server is Google AdSense.

When a website owner incorporates the Google AdSense code into their website, it enables the display of advertisements in specific locations. The revenue generated from these ads is then distributed by Google based on the traffic generated on the website.

This MVP aims to provide an understanding of how ad servers operate, starting from the creation of an advertiser's advertising campaign to the delivery of ads on the publisher's website.


There are three key roles in an ad server:

**Administrators**: They manage ad campaigns for publishers and advertisers.

**Publishers**: They display ads from the administrator on their website and earn revenue based on impressions.

**Advertisers**: They create ad campaigns and pay for ad placement.

## Delivery of Ad Campaign

### 1. Linking ad campaign to publisher's zone

In order to deliver an ad campaign, it must be linked to the publisher's zone. This can be done by creating a Placement.

#### Making a Placement

Code example
```javascript
var zoneID = 1342;
var campaignID = 52492;

Placement.create({
   "zone.id": zoneID, // ID of Zone
   "advertisement.id": campaignID // ID of Ad Campaign
});
```

Sample response
```json
{
  "zone": {
    "id": 1342
  },
  "advertisement": {
    "id": 52492,
    "type": "campaign"
  },
  "id": 2134,
  "object": "placement",
}
```

### 2. The linked ad campaign is displayed on the publisher’s website
Publishers insert the zone tag into their website. The zone tag contains the zone ID and requests an appropriate ad campaign using the zone ID when a page loads.
```html
<html>
   <head>
      <title> Huffington Post </title>
   </head>
   <body>
      ...

      <!-- Start of Ad Banner area -->
      <iframe src="http://localhost/adserve?zone_id=1&type=iframe" 
        width="300" 
        height="250"></iframe>
      <!-- End of Ad Banner area -->
      
      ...
   </body>
</html>
```
The assigned ad campaign is displayed in the publisher’s zone.

### Collection of Ad Statistics
Impressions are recorded when the publisher requests the ad campaign. Clicks are recorded when a viewer clicks on the banner ad.

Clicks are collected by generating a redirect URL that passes through the ad server address when a viewer clicks on the ad banner image. The clicks from the ad campaign are recorded and then the viewer is redirected to the landing page of the ad.

Code example
```javascript
router.get("/redirect", async function(req, res) {
   // ... omit ...

   // Increase click count
   await Report.update(query, { $inc: { clicks: 1 } });

   // Redirect viewer to landing page 
   return res.redirect(adItem.location);
});
```
Thus, viewers access the ad campaign through this pattern: Click on **ad banner → pass through ad server → arrive at original link of ad banner**

### Future Updates
In future updates, I'd like to implement Ad Targeting because it is, in my option, the most interesting part of the entire process. Its also the most difficult so I'd essentially have to dedicate a new project to implementing algorithms to a decent standard (and training on user data). This article outlines what direction I'd like to go in for this next update: https://www.jonloomer.com/meta-ads-algorithm/

I hope you enjoy my project!

