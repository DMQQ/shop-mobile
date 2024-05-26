import Ripple from "react-native-material-ripple";
import { SharedElement } from "react-navigation-shared-element";
import { Text, Image } from "react-native";
import styles from "../styles";
import { Sale } from "../hooks/useDailySale";

interface SharedImageProps {
  data: Sale;
  onPress: () => void;
  src: string;
}

export default ({ data, onPress, src }: SharedImageProps) => (
  <Ripple onPress={onPress} style={styles.image_container}>
    <Text style={styles.off}>20% Off</Text>
    <SharedElement id={`prod_id.${data?.prod_id}DAILY`}>
      <Image style={[styles.image]} resizeMode="cover" source={{ uri: src }} />
    </SharedElement>
  </Ripple>
);
