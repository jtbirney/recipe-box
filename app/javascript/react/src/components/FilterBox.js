import React from 'react'

const FilterBox = props => {
  let checkboxFields = []
  let checkboxes = props.checkboxes
  for (var key in checkboxes) {
    if (key !== "recipesearch" && key !== "ingredients") {
      let result = key.replace( /([A-Z])/g, " $1" )
      let finalResult = result.charAt(0).toUpperCase() + result.slice(1)
      checkboxFields.push(
        <div key={key} className="small-3 cell">
          <label>
            <input
              key={key}
              name={key}
              type="checkbox"
              checked={checkboxes[key]}
              onChange={props.handleChange}
            />
            {finalResult}
          </label>
        </div>
      )
    }
  }

  return(
    <div className="grid-x callout">
      <div className="small-12 cell">
        <div className="grid-x">
          <div className="small-3 cell">
            <h5>Number of Ingredients</h5>
          </div>
          <div className="small-3 cell">
            <select name="ingredients" value={props.ingredients} onChange={props.handleChange}>
              <option value={null} label="No limit"/>
              <option value={1} label="1"/>
              <option value={2} label="2"/>
              <option value={3} label="3"/>
              <option value={4} label="4"/>
              <option value={5} label="5"/>
              <option value={6} label="6"/>
              <option value={7} label="7"/>
              <option value={8} label="8"/>
              <option value={9} label="9"/>
              <option value={10} label="10"/>
              <option value={11} label="11"/>
              <option value={12} label="12"/>
              <option value={13} label="13"/>
              <option value={14} label="14"/>
              <option value={15} label="15"/>
            </select>
          </div>
        </div>
        <h5>Dietary Restrictions</h5>
        <div className="grid-x">
          {checkboxFields}
        </div>
      </div>
    </div>
  )
}

export default FilterBox
