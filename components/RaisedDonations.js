import { ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { BaseUrl } from "./constants";
import Loader from "./Loader";
import CardDetails from "./UserData/CardDetails";

const RaisedDonations = ({ route }) => {
  const { campaign } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [campaignDonations, setcampaignDonations] = useState();
  const ReqUrl = `${BaseUrl}/campaigndonations/${
    campaign.campaignId ? campaign.campaignId : campaign._id
  }`;
  // console.log(campaign);

  useEffect(() => {
    setIsLoading(true);
    fetch(ReqUrl, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setcampaignDonations(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {isLoading && <Loader title="Loading Campaign Details" />}
      {!isLoading && (
        <SafeAreaView>
          <ScrollView>
            <CardDetails
              campaignDonations={campaignDonations}
              campaign={campaign}
            />
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default RaisedDonations;
