#### Filter Controller

```jsx
import { isEqual } from 'lodash';

initialState = {
  searchValue: '',
  filters: [
        { 
          fieldName: 'Type',
          type: 'SINGLE_SELECT',
          selectOptions: [
            {
              label: 'Product Training',
              value: 'Product Training'
            },
            {
              label: 'Personal Development',
              value: 'Personal Development'
            },
            {
              label: 'Soft Skill',
              value: 'Soft Skill'
            }
          ]
        },
        {
          fieldName: 'Training Provider',
          type: 'SINGLE_SELECT',
          selectOptions: [
            {
              label: 'Internal',
              value: 'Internal'
            },
            {
              label: 'External',
              value: 'External'
            },
            {
              label: 'Others',
              value: 'Others'
            }
          ]
        }
      ],
  tags: []
};

<FilterController
  filters = {state.filters}
  tags = {state.tags}
  searchValue = {state.searchValue}
  filterMessage = 'Show all training where:'
  searchPlaceholder = 'Search training'
  onFilterAdded = {(filter) => { setState({ tags: (state.tags.filter(tag => tag.fieldName !== filter.fieldName)).concat(filter) }) }}
  onTagDeleted = {(deletedTag) => { setState({ tags: state.tags.filter(tag => !isEqual(tag, deletedTag)) }) }}
  onSearchUpdated = {(event) => { setState({ searchValue: event.target.value }); console.log('search value updated:', event.target.value) }}
  onSearchCleared = {(event) => { setState({ searchValue: '' }); alert('clear search value') }}
/>
```

#### Filter Controller with specific margins

```jsx
import { isEqual } from 'lodash';

initialState = {
  searchValue: '',
  filters: [
    { 
      fieldName: 'Gender',
      type: 'SINGLE_SELECT',
      selectOptions: [
        {
          label: 'Female',
          value: 'Female'
        },
        {
          label: 'Male',
          value: 'Male'
        },
        {
          label: 'Others',
          value: 'Others'
        }
      ]
    },
    {
      fieldName: 'Drink perference',
      type: 'SINGLE_SELECT',
      selectOptions: [
        {
          label: 'Tea',
          value: 'Tea'
        },
        {
          label: 'Coffee',
          value: 'Coffee'
        },
        {
          label: 'Others',
          value: 'Others'
        }
      ]
    }
  ],
  tags: []
};

<FilterController
  margins={{
      top: 20,
      left: 20,
      right: 20,
      bottom: 20
    }}
  tableName='people'
  filters = {state.filters}
  tags = {state.tags}
  searchValue = {state.searchValue}
  filterMessage = 'Show all people where:'
  searchPlaceholder = 'Search people'
  onFilterAdded = {(filter) => { setState({ tags: (state.tags.filter(tag => tag.fieldName !== filter.fieldName)).concat(filter) }) }}
  onTagDeleted = {(deletedTag) => { setState({ tags: state.tags.filter(tag => !isEqual(tag, deletedTag)) }) }}
  onSearchUpdated = {(event) => { setState({ searchValue: event.target.value }); console.log('search value updated:', event.target.value) }}
  onSearchCleared = {(event) => { setState({ searchValue: '' }); alert('clear search value') }}
/>
```