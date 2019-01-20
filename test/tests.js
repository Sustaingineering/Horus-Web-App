/**
 * Require the files in order so that when 'mocha' is called on this file,
 * it executes the test in the correct order
 */

require(`./auth_spec.js`)
require(`./resetPassword_spec.js`)
require(`./filewatch_spec.js`)
require(`./datastore_spec.js`)
require(`./cache_spec.js`)
require(`./statistics_spec.js`)