import React from 'react';
import {Image, StyleSheet, View, Share, Alert} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {Product} from '../../../infra/types';
import Button from '../../../shared/ui/button';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ProductSlideProps {
  item: Product;
  index: number;
  addToCart: (product: Product) => void;
}

const ProductSlide = ({item, index, addToCart}: ProductSlideProps) => {
  const handleShare = async (data: Product) => {
    try {
      const result = await Share.share({
        message: `${data.title} - ${data.description} - $ ${data.price}}`,
        url: 'testapp://home',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <Card key={index} style={styles.container}>
      <Card.Cover
        style={styles.image}
        width={342}
        source={{
          uri: item.thumbnail,
        }}
      />
      <Card.Content style={styles.content}>
        <View style={styles.itemInfoContainer}>
          <Image source={{uri: item.thumbnail}} width={50} height={50} />
          <View style={styles.itemInfo}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.actions}>
              <Text style={styles.producrPrice}>$ {item.price}</Text>
              <Button mode="contained" onPress={handleAddToCart}>
                <MaterialIcons name="add-circle" size={16} />
              </Button>
            </View>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => handleShare(item)}
          icon={'share'}
          mode="contained-tonal">
          Share
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
  image: {
    height: 200,
  },
  content: {
    paddingVertical: 16,
  },
  itemInfoContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  itemInfo: {
    gap: 4,
    flexShrink: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    flex: 1,
    flexWrap: 'wrap',
  },
  producrPrice: {
    fontSize: 16,
    color: '#102654',
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ProductSlide;
