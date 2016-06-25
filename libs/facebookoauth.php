<?php
/*
 * Binseop Ko
 * opentutorials.org
 *
 * Code based on:
 * twitteroauth : https://github.com/abraham/twitteroauth
 * Fire Eagle code - http://github.com/myelin/fireeagle-php-lib
 * twitterlibphp - http://github.com/jdp/twitterlibphp
 */

/* Load OAuth lib. You can find it at http://oauth.net */
require_once('OAuth.php');

/**
 * Twitter OAuth class
 */
class FacebookOAuth {
  /* Contains the last HTTP status code returned */
  public $http_code;
  /* Contains the last API call */
  public $last_api_call;
  /* Set up the API root URL */
  public $host = "https://graph.facebook.com/";
  /* Set timeout default */
  public $timeout = 30;
  /* Set connect timeout */
  public $connecttimeout = 30; 
  /* Verify SSL Cert */
  public $ssl_verifypeer = FALSE;
  /* Respons format */
  public $format = 'json';
  /* Decode returne json data */
  public $decode_json = TRUE;
  /* Immediately retry the API call if the response was not successful. */
  //public $retry = TRUE;




  /**
   * Set API URLS
   */
  function accessTokenURL()  { return 'https://graph.facebook.com/oauth/access_token'; }

  /**
   * Debug helpers
   */
  function lastStatusCode() { return $this->http_status; }
  function lastAPICall() { return $this->last_api_call; }

  /**
   * construct FacebookOAuth object
   */
  function __construct($consumer_key, $consumer_secret, $oauth_token = NULL, $dummy = NULL) {
    $this->consumer = new OAuthConsumer($consumer_key, $consumer_secret);
    if (!empty($oauth_token)) {
      $this->token = new OAuthConsumer($oauth_token, $dummy);
    } else {
      $this->token = NULL;
    }
  }


  /* remove query string */
  function remove_query($org)
  {
    $pos = strpos($org,'?');
    if ($pos)
        return substr($org, 0, $pos);
    else
        return $org;
    }
    
  /**
   * Exchange the request token and secret for an access token and
   * secret, to sign API calls.
   *
   * @returns array("oauth_token" => the access token)
   */
  function getAccessToken($oauth_verifier = FALSE, $redirect_uri= FALSE) {
    $parameters = array();
    if (!empty($oauth_verifier)) {
        $parameters['code'] = $oauth_verifier;
    }
    if (!empty($redirect_uri)) {
        $parameters['redirect_uri'] = $redirect_uri;
    }
    else
    {
        $parameters['redirect_uri'] = 'http://' . $_SERVER['HTTP_HOST'] . $this->remove_query($_SERVER['REQUEST_URI']);
    }

    $parameters['client_id'] = $this->consumer->key;
    $parameters['client_secret'] = $this->consumer->secret;

    $request = $this->oAuthRequest($this->accessTokenURL(), 'GET', $parameters);
    $token = OAuthUtil::parse_parameters($request);
    $this->token = new OAuthConsumer($token['access_token'], $token['oauth_token_secret']);
    $token['oauth_token'] = $token['access_token'];
    return $token;
  }

  /**
   * GET wrappwer for oAuthRequest.
   */
  function get($url, $parameters = array()) {
    $response = $this->oAuthRequest($url, 'GET', $parameters);
    if ($this->format === 'json' && $this->decode_json) {
      return json_decode($response);
    }
    return $response;
  }
  
  /**
   * POST wreapper for oAuthRequest.
   */
  function post($url, $parameters = array()) {
    $response = $this->oAuthRequest($url, 'POST', $parameters);
    if ($this->format === 'json' && $this->decode_json) {
      return json_decode($response);
    }
    return $response;
  }

  /**
   * DELTE wrapper for oAuthReqeust.
   */
  function delete($url, $parameters = array()) {
    $response = $this->oAuthRequest($url, 'DELETE', $parameters);
    if ($this->format === 'json' && $this->decode_json) {
      return json_decode($response);
    }
    return $response;
  }

  /**
   * Format and sign an OAuth / API request
   */
  function oAuthRequest($url, $method, $parameters) {
    if (strrpos($url, 'https://') !== 0 && strrpos($url, 'http://') !== 0) {
      $url = "{$this->host}{$url}";
    }
    if ($this->token->key)
        $parameters['access_token'] = $this->token->key;
        
    $request = OAuthRequest::from_request($method, $url, $parameters);
    switch ($method) {
    case 'GET':
      return $this->http($request->to_url(), 'GET');
    default:
      return $this->http($request->get_normalized_http_url(), $method, $request->to_postdata());
    }
  }

  /**
   * Make an HTTP request
   *
   * @return API results
   */
  function http($url, $method, $postfields = NULL) {
    $ci = curl_init();
    /* Curl settings */
    curl_setopt($ci, CURLOPT_CONNECTTIMEOUT, $this->connecttimeout);
    curl_setopt($ci, CURLOPT_TIMEOUT, $this->timeout);
    curl_setopt($ci, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ci, CURLOPT_HTTPHEADER, array('Expect:'));
    curl_setopt($ci, CURLOPT_SSL_VERIFYPEER, $this->ssl_verifypeer);

    switch ($method) {
      case 'POST':
        curl_setopt($ci, CURLOPT_POST, TRUE);
        if (!empty($postfields)) {
          curl_setopt($ci, CURLOPT_POSTFIELDS, $postfields);
        }
        break;
      case 'DELETE':
        curl_setopt($ci, CURLOPT_CUSTOMREQUEST, 'DELETE');
        if (!empty($postfields)) {
          $url = "{$url}?{$postfields}";
        }
    }

    curl_setopt($ci, CURLOPT_URL, $url);
    $response = curl_exec($ci);
    $this->http_code = curl_getinfo($ci, CURLINFO_HTTP_CODE);
    $this->last_api_call = $url;
    curl_close ($ci);
    return $response;
  }
}
