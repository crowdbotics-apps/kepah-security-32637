import React from 'react';
import {View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Example = ({isVisible, mode, onConfirm, onCancel}) => {
  return (
    <View>
      <DateTimePickerModal
        isVisible={isVisible}
        mode={mode}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </View>
  );
};

export default Example;
