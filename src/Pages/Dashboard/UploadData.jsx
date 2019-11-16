import React from 'react'
import PropTypes from 'prop-types'

import Papa from 'papaparse'
import { apply, compose, lift, splitAt, zipObj } from 'ramda'

const timestamp = Date.now();

class UploadData extends React.Component {
    sendData = data => {
        this.props.firebase.database().ref("testBranch" + "/" + timestamp).set(data);
    }

    handleFile = event => {
        const file = event.target.files[0]
        const keys = this.props.keys
        const onDataUploaded = this.props.onDataUploaded
        const onError = this.props.onError
        const sendData = this.sendData

        Papa.parse(file, {
            skipEmptyLines: true,
            error: function (err, file, inputElem, reason) {
                onError({ err, file, inputElem, reason })
            },
            complete: function (results) {
                const data = results.data

                // remove display headers
                data.shift()

                // add api headers
                data.unshift(keys)

                // convert all values in the 2D array to float
                for (var i in data.slice(1)) {
                    for (var j in data.slice(1)[i]) {
                        data.slice(1)[i][j] = parseFloat(data.slice(1)[i][j]);
                        console.log(data.slice(1)[i][j])
                    }
                }

                // convert arrays to objects
                const formatedResult = compose(
                    apply(lift(zipObj)),
                    splitAt(1),
                )(data)

                // send result to state
                onDataUploaded(formatedResult)

                // send data to database
                for (var o in formatedResult) {
                    sendData(formatedResult[o]);
                }
            },
        })
    }

    render() {
        return this.props.render(this.handleFile)
    }
}

UploadData.propTypes = {
    keys: PropTypes.array.isRequired,
    onDataUploaded: PropTypes.func.isRequired,
    onError: PropTypes.func,
}

export default UploadData