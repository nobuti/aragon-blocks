## Considerations

I spent ~12 hours to complete the challenge. The worst part was definitely dealing with blocks and transactions data. I think my knowledge is too vague, and I don't feel so much confident on this part. The data returned by Infura reports timestamp from 49 years ago, not sure if I missconfigured something along the way.

The project is published at https://aragon.surge.sh/

The requirements were wide enough to explore and experiment with the UI. My goal was to satisfy the requirements in the first place, building a nice and clean UI. For this, I design a mini landing page, introducing microinteractions to make the experience fancier. For the dataview part, I took https://etherscan.io/ as example to show the data.

For the UI, I focused on transitions, and even I built an animation, but at the end, it doesn't seem to fit right. It added some noise and bad performance, so I decided to get rid of it. You can see the source of if at `components/traffic` folder though.

From the code point of view, I tried to keep the project small. I built a simple SPA with 2 routes. For this porpose, I relied on `react-router-dom` dependency. Also, all the styling is done using `styled-components` and animations using `react-pose`. I used a couple libraries made by myself and published as npm packages: `"@nobuti/react-plug`, and `@nobuti/styled-reset`. The first one is a compilation of hooks I usually use in my projects. I try to avoid React classes these days to make my components as much performant as I can. The second library is basically a css reset to manage a common ground for every browser.

For the tests, I use `jest` and `@testing-library/react`. I built some tests as an example of my testing skills. I try to keep the project building inside a weekend time window, and on the other hand, there is almost no logic on the components.

