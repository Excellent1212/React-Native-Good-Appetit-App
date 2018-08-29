// @flow

import React, { Component, Fragment } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import styled from 'styled-components';

import { withNavigation } from 'react-navigation';
import { ROUTE_NAMES } from 'components/screens/home/routes';

const Container = styled(View)`
  height: ${({ theme }) => (theme.metrics.getHeightFromDP('20%'))}px;
  width: ${({ theme }) => (theme.metrics.getWidthFromDP('70%'))}px;
  margin-left: ${({ theme, index }) => (index === 0 ? theme.metrics.largeSize : 0)}px;
  margin-right: ${({ theme }) => theme.metrics.smallSize}
  border-radius: ${({ theme }) => theme.metrics.borderRadius};
`;

const ContainerShimmer = styled(ShimmerPlaceHolder)`
  height: ${({ theme }) => (theme.metrics.getHeightFromDP('20%'))}px;
  width: ${({ theme }) => (theme.metrics.getWidthFromDP('70%'))}px;
  margin-left: ${({ theme, index }) => (index === 0 ? theme.metrics.largeSize : 0)}px;
  margin-right: ${({ theme }) => theme.metrics.smallSize}
  border-radius: ${({ theme }) => theme.metrics.borderRadius};
  position: absolute;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.darkLayer};
  border-radius: ${({ theme }) => theme.metrics.borderRadius};
`;

const EventTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5%')};
  padding-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('1%')};
  font-family: CircularStd-Black;
`;

const EventDescription = styled(Text)`
  color: ${({ theme }) => theme.colors.defaultWhite};
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('3.8%')};
  font-family: CircularStd-Medium;
  text-align: center;
`;

const EventImage = styled(Image).attrs({
  source: ({ imageURL }) => ({ uri: imageURL }),
})`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: ${({ theme }) => theme.metrics.borderRadius};
`;

const AboutEventWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  padding: ${({ theme }) => theme.metrics.getWidthFromDP('4%')}px;
`;

type Props = {
  eventTitle: string,
  eventDescription: string,
  eventImage: string,
  index: number,
  navigation: Function,
};

class InYourCityListItem extends Component<Props, {}> {
  state = {
    isImageLoaded: false,
  };

  onLoadImage = () => {
    this.setState({
      isImageLoaded: true,
    });
  }

  render() {
    const {
      navigation,
      eventTitle,
      eventDescription,
      eventImage,
      index,
    } = this.props;

    const { isImageLoaded } = this.state;

    const onPressItem = () => {
      navigation.navigate(ROUTE_NAMES.EVENT_DETAILS, {
        eventTitle,
        eventDescription,
        eventImage,
      });
    };

    return (
      <Fragment>
        <Container index={index}>
          <TouchableOpacity
            onPress={() => onPressItem()}
          >
            <EventImage
              imageURL={eventImage}
              onLoad={() => this.onLoadImage()}
            />
            <DarkLayer />
            <AboutEventWrapper>
              <EventTitle>
                {eventTitle}
              </EventTitle>
              <EventDescription>
                {eventDescription}
              </EventDescription>
            </AboutEventWrapper>
          </TouchableOpacity>
        </Container>
        <ContainerShimmer
          autoRun
          index={index}
          visible={isImageLoaded}
        />
      </Fragment>
    );
  }
}


export default withNavigation(InYourCityListItem);