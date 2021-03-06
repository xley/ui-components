#### Basic Currency Text

```jsx
  <CurrencyText
    value={1000.499}
    prefix='AUD'
    decimalPlace={2}
   />
```

#### Currency Text With A Value Hint

```jsx
  import { Props } from '@Common';

  <CurrencyText
    value={1000.499}
    prefix='AUD'
    decimalPlace={2}
    valueHintComponentProps={{
      hint: 'Some hint regarding the currency value',
      hintType: Props.HintWrapperType.Popover,
      width: 250
    }}
   />
```

#### Colored Currency Text

```jsx
  import { Variables } from '@Common';

  <CurrencyText
    value={1000.499}
    prefix='AUD'
    prefixColor={Variables.Color.g400}
    valueColor={Variables.Color.r400}
    decimalPlace={2}
   />
```

#### Styled Currency Text

```jsx
   <div>
    <CurrencyText
      value={1000}
      prefix='AUD'
      prefixType='xsmall'
      valueType='heading'
    />
    <br/>
    <CurrencyText
      value={1000}
      prefix='AUD'
      prefixType='body'
      valueType='xsmall'
    />
    <br/>
    <CurrencyText
      value={1000}
      prefix='AUD'
      prefixType='display-large'
      valueType='display'
    />
  </div>
```

#### Flex Aligned Currency Text

```jsx
   <div>
    <CurrencyText
      value={1000}
      prefix='AUD'
      prefixType='xsmall'
      valueType='heading'
      flexAlign
    />
    <br/>
    <CurrencyText
      value={1000}
      prefix='AUD'
      prefixType='body'
      valueType='xsmall'
      flexAlign
    />
    <br/>
    <CurrencyText
      value={1000}
      prefix='AUD'
      prefixType='display-large'
      valueType='display'
      flexAlign
    />
  </div>
```

#### Empty Currency Text

```jsx
  <CurrencyText />
```

#### Currency Text With Margins

```jsx
  <CurrencyText
    isInline={false}
    margins={{
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      }}
    value={1000.499}
    prefix='AUD'
    decimalPlace={2}
   />
```

#### Using Currency Text formatter externally

CurrencyText exports it's formatter so that it can be used in
other places

```jsx
  <div>{CurrencyText.formatter(1000, 2)}</div>
```
