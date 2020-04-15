import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { Button, Dialog, Portal, Checkbox, RadioButton, Subheading } from 'react-native-paper'
// import { Option } from '../../..'


// type OptionDialogProps = {
//   visible: boolean
//   onOk: (value: any, upward: boolean) => void
//   hideDialog: () => void
//   options: Option[]
//   defaultRadioValue: any
//   title: string,
//   checkProps?: {
//     use: boolean
//     text?: string
//   }
// }

// type OptionDialogState = {
//   checkBox: boolean
//   radioValue: any
// }

const createDefaultState = (defaultRadioValue) => ({
  checkBox: true,
  radioValue: defaultRadioValue
})

// type Dispatch = React.Dispatch<React.SetStateAction<OptionDialogState>>

const toggleRadioChecked = (setState) => {
  setState(prevState => ({ ...prevState, checkBox: !prevState.checkBox }))
}

const OptionDialog = ({
  visible,
  hideDialog,
  options,
  onOk,
  defaultRadioValue,
  title,
  checkProps = {
    use: true,
    text: 'Ascendente:'
  }
}) => {
  const [state, setState] = useState(createDefaultState(defaultRadioValue))
  return (
    <View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Dialog.ScrollArea>
              {
                options.map(op => (
                  <TouchableWithoutFeedback
                    key={op.value}
                    onPress={() => setState({ ...state, radioValue: op.value })}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <RadioButton
                        value={op.value}
                        status={state.radioValue == op.value ? 'checked' : 'unchecked'}
                        style={{ paddingVertical: 0 }}
                      />
                      <Subheading style={{ flex: 1 }}>{op.name}</Subheading>
                    </View>
                  </TouchableWithoutFeedback>
                ))
              }
            </Dialog.ScrollArea>
          </Dialog.Content>
          <Dialog.Actions>
            {
              checkProps.use &&
              <TouchableWithoutFeedback
                onPress={() => toggleRadioChecked(setState)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text>{checkProps.text}</Text>
                  <Checkbox
                    status={state.checkBox ? 'checked' : 'unchecked'}
                    onPress={() => toggleRadioChecked(setState)}
                  />
                </View>
              </TouchableWithoutFeedback>
            }
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={() => {
              onOk(state.radioValue, state.checkBox)
              hideDialog()
            }}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}


export default OptionDialog
