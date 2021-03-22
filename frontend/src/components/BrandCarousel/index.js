import React from 'react';
import './styles.scss';

// props image address, profile heading profile description, alternative name

const BrandCarousel = () => {
  return (
    <>
      <div className="container">
        <h1 className="text-center" style={{ color: '#333840' }}>
          OFFERS YOU CAN'T REFUSE
        </h1>
        <hr></hr>
        <div className="row">
          <div className="col-md-4">
            <div className="profile-card-2">
              <img
                src="https://web-assets.cred.club/_next/assets/images/home-page/features/fold1.png"
                className="img img-responsive"
                alt="cred-pic"
              />
            </div>
            <div className="profile-about">
              <div className="profile-heading">we’ve got your back.</div>
              <div className="profile-description">
                gain complete control over your credit card with CRED Protect.
                receive category-based analysis of your spends, detect hidden
                charges, and track your credit limit in real-time.
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="profile-card-2">
              <img
                src="https://web-assets.cred.club/_next/assets/images/home-page/features/fold2.png"
                className="img img-responsive"
                alt="cred-pic"
              />
            </div>
            <div className="profile-about">
              <div className="profile-heading">begin your winning streak.</div>
              <div className="profile-description">
                use your CRED coins to participate in games and raffles to win
                the most exclusive rewards and cashbacks on CRED. good luck.
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="profile-card-2">
              <img
                src="https://web-assets.cred.club/_next/assets/images/home-page/features/fold4.png"
                className="img img-responsive"
                alt="cred-pic"
              />
            </div>
            <div className="profile-about">
              <div className="profile-heading">more cash in your pockets.</div>
              <div className="profile-description">
                switch to CRED RentPay and start paying rent with your credit
                card. this way you get up to 45 days of credit free period, more
                reward points and a happy landlord.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandCarousel;
