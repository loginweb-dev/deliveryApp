import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

// Components
import ImageCard from "../../components/ImageCard/ImageCardAlt";

// UI
import Separator from '../../ui/Separator';
import Loading from '../../ui/Loading';

// Configurations
import { Config, reziseImage } from '../../config/config';

// Registers
import { Categories } from '../../config/registers';

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      categoriesList: Config.debug ? Categories : [],
      loading: true,
    }
  }

  componentDidMount() {
    if(!Config.debug){
      this.getData()
    }else{
      this.setState({ loading: false });
    }
  }
  
  getData = () => {
    let apiURL = `${Config.API}/api/v2`;
    fetch(`${apiURL}/index_alt`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        categoriesList: res.categoriesList,
        loading: false
      });
    })
    .catch(error => {
        console.log(error);
    });
  }

  onPressCard(category){
    this.props.navigation.navigate('CategoryDetails', {category});
  }

  render(){
    if(this.state.loading){
      return <Loading size="large" />
    }
    return (
      <View style={ style.container }>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            this.state.categoriesList.map(item =>
              <ImageCard
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
                onPress={() => this.onPressCard(item)}
              />
            )
          }
          <Separator height={30} />
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Config.color.background
  },
});

export default Index;
