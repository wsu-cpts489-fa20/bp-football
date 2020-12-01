import React from "react";

// My Teams page, instead of Feed
class FeedPage extends React.Component {
  render() {
    return (
      <div className="padded-page">
        <center>
          {/*
            create a form:
            front-end:
            - each input represents a position on a football team
            back-end:
            - automatically fill in input boxes with current players on the roster
                - i.e. wb, wr, rb, d, k
            - inputs can be drop downs, or w/e else is easiest
            - dropdown filters by position 
            */}
        </center>
      </div>
    );
  }
}

export default FeedPage;
