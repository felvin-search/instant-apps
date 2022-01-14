//data imported from MDN - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const status_codes = [
  {
    value: "100",
    meaning: "Continue",
    description:
      "This interim response indicates that the client should continue the request or ignore the response if the request is already finished.",
  },
  {
    value: "101",
    meaning: "Switching Protocols",
    description:
      "This code is sent in response to an Upgrade request header from the client and indicates the protocol the server is switching to.",
  },
  {
    value: "102",
    meaning: "Processing",
    description:
      "This code indicates that the server has received and is processing the request, but no response is available yet.",
  },
  {
    value: "103",
    meaning: "Early Hints",
    description:
      "This status code is primarily intended to be used with the Link header, letting the user agent start preloading resources while the server prepares a response.",
  },
  {
    value: "200",
    meaning: "OK",
    description:
      'The request succeeded. The result meaning of "success" depends on the HTTP method',
  },
  {
    value: "201",
    meaning: "Created",
    description:
      "The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests.",
  },
  {
    value: "202",
    meaning: "Accepted",
    description:
      "The request has been received but not yet acted upon. It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request. It is intended for cases where another process or server handles the request, or for batch processing.",
  },
  {
    value: "203",
    meaning: "Non-Authoritative Information",
    description:
      "This response code means the returned metadata is not exactly the same as is available from the origin server, but is collected from a local or a third-party copy. This is mostly used for mirrors or backups of another resource. Except for that specific case, the 200 OK response is preferred to this status.",
  },
  {
    value: "204",
    meaning: "No Content",
    description:
      "There is no content to send for this request, but the headers may be useful. The user agent may update its cached headers for this resource with the new ones.",
  },
  {
    value: "205",
    meaning: "Reset Content",
    description:
      "Tells the user agent to reset the document which sent this request.",
  },
  {
    value: "206",
    meaning: "Partial Content",
    description:
      "This response code is used when the Range header is sent from the client to request only part of a resource.",
  },
  {
    value: "207",
    meaning: "Multi-Status",
    description:
      "Conveys information about multiple resources, for situations where multiple status codes might be appropriate.",
  },
  {
    value: "208",
    meaning: "Already Reported",
    description:
      "Used inside a <dav:propstat> response element to avoid repeatedly enumerating the internal members of multiple bindings to the same collection.",
  },
  {
    value: "226",
    meaning: "IM Used",
    description:
      "The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.",
  },
  {
    value: "300",
    meaning: "Multiple Choice",
    description:
      "The request has more than one possible response. The user agent or user should choose one of them. (There is no standardized way of choosing one of the responses, but HTML links to the possibilities are recommended so the user can pick.)",
  },
  {
    value: "301",
    meaning: "Moved Permanently",
    description:
      "The URL of the requested resource has been changed permanently. The new URL is given in the response.",
  },
  {
    value: "302",
    meaning: "Found",
    description:
      "This response code means that the URI of requested resource has been changed temporarily. Further changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.",
  },
  {
    value: "303",
    meaning: "See Other",
    description:
      "The server sent this response to direct the client to get the requested resource at another URI with a GET request.",
  },
  {
    value: "304",
    meaning: "Not Modified",
    description:
      "This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.",
  },
  {
    value: "305",
    meaning: "Use Proxy",
    description:
      "Defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy. It has been deprecated due to security concerns regarding in-band configuration of a proxy.",
  },
  {
    value: "306",
    meaning: "unused",
    description:
      "This response code is no longer used; it is just reserved. It was used in a previous version of the HTTP/1.1 specification.",
  },
  {
    value: "307",
    meaning: "Temporary Redirect",
    description:
      "The server sends this response to direct the client to get the requested resource at another URI with same method that was used in the prior request. This has the same semantics as the 302 Found HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.",
  },
  {
    value: "308",
    meaning: "Permanent Redirect",
    description:
      "This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.",
  },
  {
    value: "400",
    meaning: "Bad Request",
    description:
      "The server could not understand the request due to invalid syntax.",
  },
  {
    value: "401",
    meaning: "Unauthorized",
    description:
      'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.',
  },
  {
    value: "402",
    meaning: "Payment Required",
    description:
      "This response code is reserved for future use. The initial aim for creating this code was using it for digital payment systems, however this status code is used very rarely and no standard convention exists.",
  },
  {
    value: "404",
    meaning: "Not Found",
    description:
      "The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.",
  },
  {
    value: "405",
    meaning: "Method Not Allowed",
    description:
      "The request method is known by the server but is not supported by the target resource. For example, an API may not allow calling DELETE to remove a resource.",
  },
  {
    value: "406",
    meaning: "Not Acceptable",
    description:
      "This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content that conforms to the criteria given by the user agent.",
  },
  {
    value: "407",
    meaning: "Proxy Authentication Required",
    description:
      "This is similar to 401 Unauthorized but authentication is needed to be done by a proxy.",
  },
  {
    value: "408",
    meaning: "Request Timeout",
    description:
      "This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.",
  },
  {
    value: "409",
    meaning: "Conflict",
    description:
      "This response is sent when a request conflicts with the current state of the server.",
  },
  {
    value: "410",
    meaning: "Gone",
    description:
      'This response is sent when the requested content has been permanently deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.',
  },
  {
    value: "411",
    meaning: "Length required",
    description:
      "Server rejected the request because the Content-Length header field is not defined and the server requires it.",
  },
  {
    value: "412",
    meaning: "Precondition failed",
    description:
      "The client has indicated preconditions in its headers which the server does not meet.",
  },
  {
    value: "413",
    meaning: "Payload Too Large",
    description:
      "Request entity is larger than limits defined by server. The server might close the connection or return an Retry-After header field.",
  },
  {
    value: "414",
    meaning: "URI Too Long",
    description:
      "The URI requested by the client is longer than the server is willing to interpret.",
  },
  {
    value: "415",
    meaning: "Unsupported Media Type",
    description:
      "The media format of the requested data is not supported by the server, so the server is rejecting the request.",
  },
  {
    value: "416",
    meaning: "Range Not Satisfiable",
    description:
      "The range specified by the Range header field in the request cannot be fulfilled. It's possible that the range is outside the size of the target URI's data.",
  },
  {
    value: "417",
    meaning: "Expectation Failed",
    description:
      "This response code means the expectation indicated by the Expect request header field cannot be met by the server.",
  },
  {
    value: "418",
    meaning: "I'm a teapot",
    description: "The server refuses the attempt to brew coffee with a teapot.",
  },
  {
    value: "421",
    meaning: "Misdirected Request",
    description:
      "The request was directed at a server that is not able to produce a response. This can be sent by a server that is not configured to produce responses for the combination of scheme and authority that are included in the request URI.",
  },
  {
    value: "422",
    meaning: "Unprocessable Entity",
    description:
      "The request was well-formed but was unable to be followed due to semantic errors.",
  },
  {
    value: "423",
    meaning: "Locked",
    description: "The resource that is being accessed is locked.",
  },
  {
    value: "424",
    meaning: "Failed Dependency ",
    description: "The request failed due to failure of a previous request.",
  },
  {
    value: "425",
    meaning: "Too Early",
    description:
      "Indicates that the server is unwilling to risk processing a request that might be replayed.",
  },
  {
    value: "426",
    meaning: "Upgrade required",
    description:
      "The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol. The server sends an Upgrade header in a 426 response to indicate the required protocol(s).",
  },
  {
    value: "428",
    meaning: "Precondition required",
    description:
      "The origin server requires the request to be conditional. This response is intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.",
  },
  {
    value: "429",
    meaning: "Too Many Requests",
    description:
      'The user has sent too many requests in a given amount of time ("rate limiting").',
  },
  {
    value: "431",
    meaning: "Request Header Fields Too Large",
    description:
      "The server is unwilling to process the request because its header fields are too large. The request may be resubmitted after reducing the size of the request header fields.",
  },
  {
    value: "451",
    meaning: "Unavailable For Legal Reasons",
    description:
      "The user agent requested a resource that cannot legally be provided, such as a web page censored by a government.",
  },
  {
    value: "500",
    meaning: "Internal Server Error",
    description:
      "The server has encountered a situation it does not know how to handle.",
  },
  {
    value: "501",
    meaning: "Not Implemented",
    description:
      "The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.",
  },
  {
    value: "502",
    meaning: "Bad Gateway",
    description:
      "This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.",
  },
  {
    value: "503",
    meaning: "Service Unavailable",
    description:
      "The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This response should be used for temporary conditions and the Retry-After HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.",
  },
  {
    value: "504",
    meaning: "Gateway Timeout",
    description:
      "This error response is given when the server is acting as a gateway and cannot get a response in time.",
  },
  {
    value: "505",
    meaning: "HTTP version not supported",
    description:
      "The HTTP version used in the request is not supported by the server.",
  },
  {
    value: "506",
    meaning: "Variant Also Negotiates",
    description:
      "The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.",
  },
  {
    value: "507",
    meaning: "Insufficient Storage",
    description:
      "The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.",
  },
  {
    value: "508",
    meaning: "Loop detected",
    description:
      "The server detected an infinite loop while processing the request.",
  },
  {
    value: "510",
    meaning: "Not extended",
    description:
      "Further extensions to the request are required for the server to fulfill it.",
  },
  {
    value: "511",
    meaning: "Network Authentication Required",
    description:
      "Indicates that the client needs to authenticate to gain network access.",
  },
];
export default status_codes;
