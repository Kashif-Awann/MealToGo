import React, { useContext, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";

import { RestaurantInfoCard } from "../components/restaurants-info-card.components";
import { RestaurantList } from "../components/restaurant-list.styles";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";

import { Search } from "../components/search.component";

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      {isLoading && (
        <View style={{ position: "absolute", top: "50%", left: "50%" }}>
          <ActivityIndicator
            size={50}
            style={{ marginLeft: -25 }}
            animating={true}
            // color={Colors.blue300}
          />
        </View>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", { restaurant: item })
              }
            >
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
