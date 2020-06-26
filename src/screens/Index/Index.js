import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import SearchBar from 'react-native-dynamic-search-bar';

// Components
import ImageCard from "../../components/ImageCard/ImageCard";
import ItemProductAlt from "../../components/ItemProductAlt/ItemProductAlt";
import ItemProduct from "../../components/ItemProduct/ItemProduct";

// Configurations
import { Config } from '../../config/config';
import { MainStyle } from '../../config/styles.js';

// Registers
import { Products, Categories } from '../../config/registers';

// UI
import Separator from '../../ui/Separator';
import PartialModal from "../../ui/PartialModal";
import Loading from '../../ui/Loading';

const scrollY = new Animated.Value(0);
const traslateY = scrollY.interpolate({
    inputRange: [0,100],
    outputRange:[0, -100]
});

const screenHeight = Math.round(Dimensions.get('window').height);

// NOTA IMPORTANTE: la variable de entorno "Config.debug" ubicada en /src/config/config.js
// sirve para elegir de donde se van a obtener los datos de la app, si es "true" se muestran los datos estáticos,
// si es "false" los datos se obtendrán de la API definida en el archivo de variables de entorno.

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      categoriesList: Config.debug ? Categories : [],
      productsList: Config.debug ? Products : [],
      productsSearch: [],
      modalVisible: false,
      keyboardHeight: 0,
      inputSearch: '',
      searchEmpty: false,
      loading: true,
    }
    this.timeoutSearch = null;
  }

  componentDidMount() {
    if(!Config.debug){
      this.getData()
    }else{
      this.setState({ loading: false });
    }

    // Detectar keyboard
    Keyboard.addListener('keyboardDidShow', (frames) => { this.setState({ keyboardHeight: frames.endCoordinates ? frames.endCoordinates.height : 320 }) });
    Keyboard.addListener('keyboardDidHide', () => { this.setState({ keyboardHeight: 0 }) });
  }

  getData = () => {
    let apiURL = `${Config.API}/api/v2`;
    fetch(`${apiURL}/index`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        categoriesList: res.categoriesList,
        productsList: res.productsList,
        loading: false
      });
    })
    .catch(error => {
        console.log(error);
    });
  }

  onPressCard(item){
    if(item.type == 'category'){
      this.props.navigation.navigate('CategoryDetails', {category: item});
    }else{
      this.props.navigation.navigate('OfferDetails', {offer: item});
    }
  }

  onPressProduct(product){
    this.setState({modalVisible: false});
    this.props.navigation.navigate('ProductDetails', {product});
  }

  handleSearch = (text) => {
    clearTimeout(this.timeoutSearch);
    this.setState({ inputSearch: text }, () => {
      this.timeoutSearch = setTimeout(() => {
        if(this.state.inputSearch){
          if(this.state.inputSearch == 'no'){
            this.setState({productsSearch: [], searchEmpty: true});
          }else{
            this.setState({productsSearch: Products, searchEmpty: false});
          }
        }else{
          this.setState({productsSearch: [], searchEmpty: false});
        }
      }, 300);
    });
  }

  render(){
    if(this.state.loading){
      return <Loading size="large" />
    }
    return (
      <View style={ style.container }>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={(e)=>{
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
        >
          <Animated.View
            style={{ 
                transform:[{
                  translateY: traslateY
                }],
                elevation: 4,
                zIndex: 100
            }}>
            <View>
              <Text style={ MainStyle.h4 }>Categorías</Text>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
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
              </ScrollView>
              <View style={{ marginHorizontal: 10, marginTop: 20, flexDirection: 'row-reverse' }}>
                <TouchableOpacity onPress={()=> this.setState({modalVisible: true, searchEmpty: false, productsSearch: []})}>
                  <Icon name='search' size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
          <Text style={ MainStyle.h4 }>Populares</Text>
          <FlatList
            data={this.state.productsList}
            renderItem={({item, index})=>
              <ItemProductAlt
                name={item.name}
                details={item.details}
                price={item.price}
                image={item.image}
                onPress={() => this.onPressProduct(item)}
                // onPressAdd={() => this.addCart(item)}
              />
            }
            numColumns={2}
          />
          <Separator height={50} />
        </ScrollView>
        <PartialModal
          animationType="slide"
          visible={this.state.modalVisible}
          height={screenHeight-this.state.keyboardHeight}
          onRequestClose={()=> this.setState({modalVisible: false})}
        >
          <View style={{ flex: 1, marginTop: 25,backgroundColor: Config.color.background }}>
            <SearchBar
                placeholder="Ingresa tu busqueda"
                onChangeText={this.handleSearch}
                onPressCancel={() => {
                  this.setState({modalVisible: false, inputSearch: ''})
                }}
                onPress={() => console.log("onPress")}
                iconColor={Config.color.primary}
              />
              <View style={{ alignItems: 'center' }}>
                <Text style={ [MainStyle.textMuted, { marginTop: 5 }] }>presione X para cancelar la busqueda.</Text>
              </View>
              <ScrollView style={{ marginTop: 10 }}>
                {
                  this.state.productsSearch.map(item=>
                    <ItemProduct
                        name={item.name}
                        details={item.details}
                        price={item.price}
                        image={item.image}
                        type={item.type}
                        onPress={() => this.onPressProduct(item)}
                        // onPressAdd={() => this.addCart(item)}
                    />
                  )
                  }
                  { this.state.inputSearch == '' &&
                    <View style={{ alignItems: 'center', marginTop: 100 }}>
                        <Image
                            style={{ width: 150, height: 150 }}
                            source={ require('../../assets/images/search.png') }
                        />
                        {/* <Text style={[MainStyle.h2, MainStyle.textMuted]}></Text> */}
                    </View>
                  }
                  { this.state.searchEmpty &&
                    <View style={{ alignItems: 'center', marginTop: 100 }}>
                        <Image
                            style={{ width: 150, height: 150 }}
                            source={ require('../../assets/images/search-empty.png') }
                        />
                        <Text style={[MainStyle.h3, MainStyle.textMuted]}>No hay resultados</Text>
                    </View>
                  }
                </ScrollView>
            </View>
        </PartialModal>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Config.color.background,
  },
});


const mapStateToProps = (state) => {
  return {
    user : state.user,
    locations : state.locations,
    cart : state.cart,
  }
}

export default connect(mapStateToProps, null)(Index);