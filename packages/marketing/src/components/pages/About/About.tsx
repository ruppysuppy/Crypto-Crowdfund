import React from 'react';

import sharedClasses from '../../../common.module.css';

export default function About() {
  return (
    <div>
      <h1 className={sharedClasses.h1}>About</h1>

      <section>
        <p className={sharedClasses.p}>
          <strong>Crypto Crowdfund</strong> Campaigns will help you turn your
          creative ideas into reality! It's where creators share new visions for
          creative work with the communities that will come together to fund
          them.
        </p>

        <p className={sharedClasses.p}>
          Some of these creators already had huge fanbases. But many projects
          have been as small-scale as a limited run of silent meditation vinyls
          or as up-and-coming.
        </p>

        <p className={sharedClasses.p}>
          No matter what, creators always control how the work comes together—no
          100-page grant applications, no donors demanding you modify your
          message, no last-minute edits from investors. When backers chip in
          funding and help spread the word, they too become part of these
          independent works.
        </p>

        <strong className={`${sharedClasses.colorPrimary} ${sharedClasses.p}`}>
          Worried about being Conned by Fake Campaign Managers?
        </strong>

        <p className={sharedClasses.p}>
          <strong>Crypto Crowdfund</strong> brings power to the Investors as
          well! Backed by the cutting-edge BlockChain Technology, only after the
          majority of the investors has approved a Transaction Request, the
          transaction can be processed.
        </p>

        <p className={sharedClasses.p}>
          No more being scammed by Fake Campaign Managers!
        </p>
      </section>

      <section>
        <h2 className={sharedClasses.h2}>Our community</h2>

        <p className={sharedClasses.p}>
          Tapping into our community starts with activating your own. Most
          successful projects build a snowball effect, winning over friends and
          early supporters who then share the idea with their networks, and
          signal their support to the wider Kickstarter community. The snowball
          can get pretty big. Over 20 million people, from every continent on
          earth, have helped fund Kickstarter projects.
        </p>
      </section>

      <section>
        <h2 className={sharedClasses.h2}>Our mission</h2>

        <p className={sharedClasses.p}>
          Our mission is to help bring creative projects to life. We believe
          that art and creative expression are essential to a healthy and
          vibrant society, and the space to create requires protection.
        </p>

        <p className={sharedClasses.p}>
          We don’t want art world elites and entertainment executives to define
          our culture; we want creative people—even those who’ve never made
          anything before—to take the wheel. We help creators connect directly
          with their communities, putting power where it belongs.
        </p>
      </section>
    </div>
  );
}
