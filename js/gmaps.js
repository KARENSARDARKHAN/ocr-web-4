"use strict";
!(function (t, o) {
  "object" == typeof exports
    ? (module.exports = o())
    : "function" == typeof define && define.amd
    ? define(["jquery", "googlemaps!"], o)
    : (t.GMaps = o());
})(this, function () {
  /*!
   * GMaps.js v0.4.25
   * http://hpneo.github.com/gmaps/
   *
   * Copyright 2017, Gustavo Leon
   * Released under the MIT License.
   */ var t,
    o,
    n,
    r,
    s,
    i = function (t, o) {
      var n;
      if (t === o) return t;
      for (n in o) void 0 !== o[n] && (t[n] = o[n]);
      return t;
    },
    a = function (t, o) {
      var n,
        r = Array.prototype.slice.call(arguments, 2),
        s = [],
        i = t.length;
      if (Array.prototype.map && t.map === Array.prototype.map)
        s = Array.prototype.map.call(t, function (t) {
          var n = r.slice(0);
          return n.splice(0, 0, t), o.apply(this, n);
        });
      else
        for (n = 0; n < i; n++)
          (callback_params = r).splice(0, 0, t[n]),
            s.push(o.apply(this, callback_params));
      return s;
    },
    l = function (t) {
      var o,
        n = [];
      for (o = 0; o < t.length; o++) n = n.concat(t[o]);
      return n;
    },
    p = function (t, o) {
      var n = t[0],
        r = t[1];
      return o && ((n = t[1]), (r = t[0])), new google.maps.LatLng(n, r);
    },
    c = function (t, o) {
      var n;
      for (n = 0; n < t.length; n++)
        t[n] instanceof google.maps.LatLng ||
          (t[n].length > 0 && "object" == typeof t[n][0]
            ? (t[n] = c(t[n], o))
            : (t[n] = p(t[n], o)));
      return t;
    },
    h = function (t, o) {
      var n,
        r = t.replace(".", "");
      return "jQuery" in this && o
        ? $("." + r, o)[0]
        : document.getElementsByClassName(r)[0];
    },
    u = function (t, o) {
      var n,
        t = t.replace("#", "");
      return "jQuery" in window && o
        ? $("#" + t, o)[0]
        : document.getElementById(t);
    },
    d = function (t) {
      var o = 0,
        n = 0;
      if (t.getBoundingClientRect) {
        var r = t.getBoundingClientRect(),
          s = -(window.scrollX ? window.scrollX : window.pageXOffset),
          i = -(window.scrollY ? window.scrollY : window.pageYOffset);
        return [r.left - s, r.top - i];
      }
      if (t.offsetParent)
        do (o += t.offsetLeft), (n += t.offsetTop);
        while ((t = t.offsetParent));
      return [o, n];
    },
    f =
      ((r = document),
      (s = function (t) {
        if (!("object" == typeof window.google && window.google.maps))
          return (
            "object" == typeof window.console &&
              window.console.error &&
              console.error(
                "Google Maps API is required. Please register the following JavaScript library https://maps.googleapis.com/maps/api/js."
              ),
            function () {}
          );
        if (!this) return new s(t);
        (t.zoom = t.zoom || 15), (t.mapType = t.mapType || "roadmap");
        var o,
          n = function (t, o) {
            return void 0 === t ? o : t;
          },
          a = this,
          l = [
            "bounds_changed",
            "center_changed",
            "click",
            "dblclick",
            "drag",
            "dragend",
            "dragstart",
            "idle",
            "maptypeid_changed",
            "projection_changed",
            "resize",
            "tilesloaded",
            "zoom_changed",
          ],
          p = ["mousemove", "mouseout", "mouseover"],
          c = [
            "el",
            "lat",
            "lng",
            "mapType",
            "width",
            "height",
            "markerClusterer",
            "enableNewStyle",
          ],
          f = t.el || t.div,
          m = t.markerClusterer,
          g = google.maps.MapTypeId[t.mapType.toUpperCase()],
          y = new google.maps.LatLng(t.lat, t.lng),
          v = n(t.zoomControl, !0),
          k = t.zoomControlOpt || { style: "DEFAULT", position: "TOP_LEFT" },
          w = k.style || "DEFAULT",
          L = k.position || "TOP_LEFT",
          b = n(t.panControl, !0),
          x = n(t.mapTypeControl, !0),
          M = n(t.scaleControl, !0),
          C = n(t.streetViewControl, !0),
          O = n(O, !0),
          P = {},
          _ = { zoom: this.zoom, center: y, mapTypeId: g },
          T = {
            panControl: b,
            zoomControl: v,
            zoomControlOptions: {
              style: google.maps.ZoomControlStyle[w],
              position: google.maps.ControlPosition[L],
            },
            mapTypeControl: x,
            scaleControl: M,
            streetViewControl: C,
            overviewMapControl: O,
          };
        if (
          ("string" == typeof t.el || "string" == typeof t.div
            ? f.indexOf("#") > -1
              ? (this.el = u(f, t.context))
              : (this.el = h.apply(this, [f, t.context]))
            : (this.el = f),
          void 0 === this.el || null === this.el)
        )
          throw "No element defined.";
        for (
          o = 0,
            window.context_menu = window.context_menu || {},
            window.context_menu[a.el.id] = {},
            this.controls = [],
            this.overlays = [],
            this.layers = [],
            this.singleLayers = {},
            this.markers = [],
            this.polylines = [],
            this.routes = [],
            this.polygons = [],
            this.infoWindow = null,
            this.overlay_el = null,
            this.zoom = t.zoom,
            this.registered_events = {},
            this.el.style.width =
              t.width || this.el.scrollWidth || this.el.offsetWidth,
            this.el.style.height =
              t.height || this.el.scrollHeight || this.el.offsetHeight,
            google.maps.visualRefresh = t.enableNewStyle;
          o < c.length;
          o++
        )
          delete t[c[o]];
        for (
          !0 != t.disableDefaultUI && (_ = i(_, T)), P = i(_, t), o = 0;
          o < l.length;
          o++
        )
          delete P[l[o]];
        for (o = 0; o < p.length; o++) delete P[p[o]];
        (this.map = new google.maps.Map(this.el, P)),
          m && (this.markerClusterer = m.apply(this, [this.map]));
        var z = function (t, o) {
          var n = "",
            r = window.context_menu[a.el.id][t];
          for (var s in r)
            if (r.hasOwnProperty(s)) {
              var i = r[s];
              n +=
                '<li><a id="' +
                t +
                "_" +
                s +
                '" href="#">' +
                i.title +
                "</a></li>";
            }
          if (u("gmaps_context_menu")) {
            var l = u("gmaps_context_menu");
            l.innerHTML = n;
            var s,
              p = l.getElementsByTagName("a"),
              c = p.length;
            for (s = 0; s < c; s++) {
              var h = p[s],
                f = function (n) {
                  n.preventDefault(),
                    r[this.id.replace(t + "_", "")].action.apply(a, [o]),
                    a.hideContextMenu();
                };
              google.maps.event.clearListeners(h, "click"),
                google.maps.event.addDomListenerOnce(h, "click", f, !1);
            }
            var m = d.apply(this, [a.el]),
              g = m[0] + o.pixel.x - 15,
              y = m[1] + o.pixel.y - 15;
            (l.style.left = g + "px"), (l.style.top = y + "px");
          }
        };
        (this.buildContextMenu = function (t, o) {
          if ("marker" === t) {
            o.pixel = {};
            var n = new google.maps.OverlayView();
            n.setMap(a.map),
              (n.draw = function () {
                var r = n.getProjection(),
                  s = o.marker.getPosition();
                (o.pixel = r.fromLatLngToContainerPixel(s)), z(t, o);
              });
          } else z(t, o);
          var r = u("gmaps_context_menu");
          setTimeout(function () {
            r.style.display = "block";
          }, 0);
        }),
          (this.setContextMenu = function (t) {
            window.context_menu[a.el.id][t.control] = {};
            var o,
              n = r.createElement("ul");
            for (o in t.options)
              if (t.options.hasOwnProperty(o)) {
                var s = t.options[o];
                window.context_menu[a.el.id][t.control][s.name] = {
                  title: s.title,
                  action: s.action,
                };
              }
            (n.id = "gmaps_context_menu"),
              (n.style.display = "none"),
              (n.style.position = "absolute"),
              (n.style.minWidth = "100px"),
              (n.style.background = "white"),
              (n.style.listStyle = "none"),
              (n.style.padding = "8px"),
              (n.style.boxShadow = "2px 2px 6px #ccc"),
              u("gmaps_context_menu") || r.body.appendChild(n);
            var i = u("gmaps_context_menu");
            google.maps.event.addDomListener(
              i,
              "mouseout",
              function (t) {
                (t.relatedTarget && this.contains(t.relatedTarget)) ||
                  window.setTimeout(function () {
                    i.style.display = "none";
                  }, 400);
              },
              !1
            );
          }),
          (this.hideContextMenu = function () {
            var t = u("gmaps_context_menu");
            t && (t.style.display = "none");
          });
        var S = function (o, n) {
          google.maps.event.addListener(o, n, function (o) {
            void 0 == o && (o = this),
              t[n].apply(this, [o]),
              a.hideContextMenu();
          });
        };
        google.maps.event.addListener(
          this.map,
          "zoom_changed",
          this.hideContextMenu
        );
        for (var W = 0; W < l.length; W++) {
          var R = l[W];
          R in t && S(this.map, R);
        }
        for (var W = 0; W < p.length; W++) {
          var R = p[W];
          R in t && S(this.map, R);
        }
        google.maps.event.addListener(this.map, "rightclick", function (o) {
          t.rightclick && t.rightclick.apply(this, [o]),
            void 0 != window.context_menu[a.el.id].map &&
              a.buildContextMenu("map", o);
        }),
          (this.refresh = function () {
            google.maps.event.trigger(this.map, "resize");
          }),
          (this.fitZoom = function () {
            var t,
              o = [],
              n = this.markers.length;
            for (t = 0; t < n; t++)
              "boolean" == typeof this.markers[t].visible &&
                this.markers[t].visible &&
                o.push(this.markers[t].getPosition());
            this.fitLatLngBounds(o);
          }),
          (this.fitLatLngBounds = function (t) {
            var o,
              n = t.length,
              r = new google.maps.LatLngBounds();
            for (o = 0; o < n; o++) r.extend(t[o]);
            this.map.fitBounds(r);
          }),
          (this.setCenter = function (t, o, n) {
            this.map.panTo(new google.maps.LatLng(t, o)), n && n();
          }),
          (this.getElement = function () {
            return this.el;
          }),
          (this.zoomIn = function (t) {
            (t = t || 1),
              (this.zoom = this.map.getZoom() + t),
              this.map.setZoom(this.zoom);
          }),
          (this.zoomOut = function (t) {
            (t = t || 1),
              (this.zoom = this.map.getZoom() - t),
              this.map.setZoom(this.zoom);
          });
        var I,
          j = [];
        for (I in this.map)
          "function" != typeof this.map[I] || this[I] || j.push(I);
        for (o = 0; o < j.length; o++)
          !(function (t, o, n) {
            t[n] = function () {
              return o[n].apply(o, arguments);
            };
          })(this, this.map, j[o]);
      }));
  return (
    (f.prototype.createControl = function (t) {
      var o = document.createElement("div");
      for (var n in ((o.style.cursor = "pointer"),
      !0 !== t.disableDefaultStyles &&
        ((o.style.fontFamily = "Roboto, Arial, sans-serif"),
        (o.style.fontSize = "11px"),
        (o.style.boxShadow = "rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px")),
      t.style))
        o.style[n] = t.style[n];
      for (var r in (t.id && (o.id = t.id),
      t.title && (o.title = t.title),
      t.classes && (o.className = t.classes),
      t.content &&
        ("string" == typeof t.content
          ? (o.innerHTML = t.content)
          : t.content instanceof HTMLElement && o.appendChild(t.content)),
      t.position &&
        (o.position = google.maps.ControlPosition[t.position.toUpperCase()]),
      t.events))
        !(function (o, n) {
          google.maps.event.addDomListener(o, n, function () {
            t.events[n].apply(this, [this]);
          });
        })(o, r);
      return (o.index = 1), o;
    }),
    (f.prototype.addControl = function (t) {
      var o = this.createControl(t);
      return this.controls.push(o), this.map.controls[o.position].push(o), o;
    }),
    (f.prototype.removeControl = function (t) {
      var o,
        n = null;
      for (o = 0; o < this.controls.length; o++)
        this.controls[o] == t &&
          ((n = this.controls[o].position), this.controls.splice(o, 1));
      if (n)
        for (o = 0; o < this.map.controls.length; o++) {
          var r = this.map.controls[t.position];
          if (r.getAt(o) == t) {
            r.removeAt(o);
            break;
          }
        }
      return t;
    }),
    (f.prototype.createMarker = function (t) {
      if (void 0 == t.lat && void 0 == t.lng && void 0 == t.position)
        throw "No latitude or longitude defined.";
      var o = this,
        n = t.details,
        r = t.fences,
        s = t.outside,
        a = i({ position: new google.maps.LatLng(t.lat, t.lng), map: null }, t);
      delete a.lat, delete a.lng, delete a.fences, delete a.outside;
      var l = new google.maps.Marker(a);
      if (((l.fences = r), t.infoWindow)) {
        l.infoWindow = new google.maps.InfoWindow(t.infoWindow);
        for (
          var p = [
              "closeclick",
              "content_changed",
              "domready",
              "position_changed",
              "zindex_changed",
            ],
            c = 0;
          c < p.length;
          c++
        )
          !(function (o, n) {
            t.infoWindow[n] &&
              google.maps.event.addListener(o, n, function (o) {
                t.infoWindow[n].apply(this, [o]);
              });
          })(l.infoWindow, p[c]);
      }
      for (
        var h = [
            "animation_changed",
            "clickable_changed",
            "cursor_changed",
            "draggable_changed",
            "flat_changed",
            "icon_changed",
            "position_changed",
            "shadow_changed",
            "shape_changed",
            "title_changed",
            "visible_changed",
            "zindex_changed",
          ],
          u = [
            "dblclick",
            "drag",
            "dragend",
            "dragstart",
            "mousedown",
            "mouseout",
            "mouseover",
            "mouseup",
          ],
          c = 0;
        c < h.length;
        c++
      )
        !(function (o, n) {
          t[n] &&
            google.maps.event.addListener(o, n, function () {
              t[n].apply(this, [this]);
            });
        })(l, h[c]);
      for (var c = 0; c < u.length; c++)
        !(function (o, n, r) {
          t[r] &&
            google.maps.event.addListener(n, r, function (n) {
              n.pixel ||
                (n.pixel = o.getProjection().fromLatLngToPoint(n.latLng)),
                t[r].apply(this, [n]);
            });
        })(this.map, l, u[c]);
      return (
        google.maps.event.addListener(l, "click", function () {
          (this.details = n),
            t.click && t.click.apply(this, [this]),
            l.infoWindow && (o.hideInfoWindows(), l.infoWindow.open(o.map, l));
        }),
        google.maps.event.addListener(l, "rightclick", function (n) {
          (n.marker = this),
            t.rightclick && t.rightclick.apply(this, [n]),
            void 0 != window.context_menu[o.el.id].marker &&
              o.buildContextMenu("marker", n);
        }),
        l.fences &&
          google.maps.event.addListener(l, "dragend", function () {
            o.checkMarkerGeofence(l, function (t, o) {
              s(t, o);
            });
          }),
        l
      );
    }),
    (f.prototype.addMarker = function (t) {
      var o;
      if (t.hasOwnProperty("gm_accessors_")) o = t;
      else if (
        (t.hasOwnProperty("lat") && t.hasOwnProperty("lng")) ||
        t.position
      )
        o = this.createMarker(t);
      else throw "No latitude or longitude defined.";
      return (
        o.setMap(this.map),
        this.markerClusterer && this.markerClusterer.addMarker(o),
        this.markers.push(o),
        f.fire("marker_added", o, this),
        o
      );
    }),
    (f.prototype.addMarkers = function (t) {
      for (var o, n = 0; (o = t[n]); n++) this.addMarker(o);
      return this.markers;
    }),
    (f.prototype.hideInfoWindows = function () {
      for (var t, o = 0; (t = this.markers[o]); o++)
        t.infoWindow && t.infoWindow.close();
    }),
    (f.prototype.removeMarker = function (t) {
      for (var o = 0; o < this.markers.length; o++)
        if (this.markers[o] === t) {
          this.markers[o].setMap(null),
            this.markers.splice(o, 1),
            this.markerClusterer && this.markerClusterer.removeMarker(t),
            f.fire("marker_removed", t, this);
          break;
        }
      return t;
    }),
    (f.prototype.removeMarkers = function (t) {
      var o = [];
      if (void 0 === t) {
        for (var n = 0; n < this.markers.length; n++) {
          var r = this.markers[n];
          r.setMap(null), f.fire("marker_removed", r, this);
        }
        this.markerClusterer &&
          this.markerClusterer.clearMarkers &&
          this.markerClusterer.clearMarkers(),
          (this.markers = o);
      } else {
        for (var n = 0; n < t.length; n++) {
          var s = this.markers.indexOf(t[n]);
          if (s > -1) {
            var r = this.markers[s];
            r.setMap(null),
              this.markerClusterer && this.markerClusterer.removeMarker(r),
              f.fire("marker_removed", r, this);
          }
        }
        for (var n = 0; n < this.markers.length; n++) {
          var r = this.markers[n];
          null != r.getMap() && o.push(r);
        }
        this.markers = o;
      }
    }),
    (f.prototype.drawOverlay = function (t) {
      var o = new google.maps.OverlayView(),
        n = !0;
      return (
        o.setMap(this.map),
        null != t.auto_show && (n = t.auto_show),
        (o.onAdd = function () {
          var n,
            r,
            s = document.createElement("div");
          (s.style.borderStyle = "none"),
            (s.style.borderWidth = "0px"),
            (s.style.position = "absolute"),
            (s.style.zIndex = 100),
            (s.innerHTML = t.content),
            (o.el = s),
            t.layer || (t.layer = "overlayLayer");
          var i = this.getPanes(),
            a = i[t.layer],
            l = ["contextmenu", "DOMMouseScroll", "dblclick", "mousedown"];
          a.appendChild(s);
          for (var p = 0; p < l.length; p++)
            (n = s),
              (r = l[p]),
              google.maps.event.addDomListener(n, r, function (t) {
                -1 != navigator.userAgent.toLowerCase().indexOf("msie") &&
                document.all
                  ? ((t.cancelBubble = !0), (t.returnValue = !1))
                  : t.stopPropagation();
              });
          t.click &&
            (i.overlayMouseTarget.appendChild(o.el),
            google.maps.event.addDomListener(o.el, "click", function () {
              t.click.apply(o, [o]);
            })),
            google.maps.event.trigger(this, "ready");
        }),
        (o.draw = function () {
          var r = this.getProjection().fromLatLngToDivPixel(
            new google.maps.LatLng(t.lat, t.lng)
          );
          (t.horizontalOffset = t.horizontalOffset || 0),
            (t.verticalOffset = t.verticalOffset || 0);
          var s = o.el,
            i = s.children[0],
            a = i.clientHeight,
            l = i.clientWidth;
          switch (t.verticalAlign) {
            case "top":
              s.style.top = r.y - a + t.verticalOffset + "px";
              break;
            default:
            case "middle":
              s.style.top = r.y - a / 2 + t.verticalOffset + "px";
              break;
            case "bottom":
              s.style.top = r.y + t.verticalOffset + "px";
          }
          switch (t.horizontalAlign) {
            case "left":
              s.style.left = r.x - l + t.horizontalOffset + "px";
              break;
            default:
            case "center":
              s.style.left = r.x - l / 2 + t.horizontalOffset + "px";
              break;
            case "right":
              s.style.left = r.x + t.horizontalOffset + "px";
          }
          (s.style.display = n ? "block" : "none"),
            n || t.show.apply(this, [s]);
        }),
        (o.onRemove = function () {
          var n = o.el;
          t.remove
            ? t.remove.apply(this, [n])
            : (o.el.parentNode.removeChild(o.el), (o.el = null));
        }),
        this.overlays.push(o),
        o
      );
    }),
    (f.prototype.removeOverlay = function (t) {
      for (var o = 0; o < this.overlays.length; o++)
        if (this.overlays[o] === t) {
          this.overlays[o].setMap(null), this.overlays.splice(o, 1);
          break;
        }
    }),
    (f.prototype.removeOverlays = function () {
      for (var t, o = 0; (t = this.overlays[o]); o++) t.setMap(null);
      this.overlays = [];
    }),
    (f.prototype.drawPolyline = function (t) {
      var o = [],
        n = t.path;
      if (n.length) {
        if (void 0 === n[0][0]) o = n;
        else
          for (var r, s = 0; (r = n[s]); s++)
            o.push(new google.maps.LatLng(r[0], r[1]));
      }
      var i = {
        map: this.map,
        path: o,
        strokeColor: t.strokeColor,
        strokeOpacity: t.strokeOpacity,
        strokeWeight: t.strokeWeight,
        geodesic: t.geodesic,
        clickable: !0,
        editable: !1,
        visible: !0,
      };
      t.hasOwnProperty("clickable") && (i.clickable = t.clickable),
        t.hasOwnProperty("editable") && (i.editable = t.editable),
        t.hasOwnProperty("icons") && (i.icons = t.icons),
        t.hasOwnProperty("zIndex") && (i.zIndex = t.zIndex);
      for (
        var a = new google.maps.Polyline(i),
          l = [
            "click",
            "dblclick",
            "mousedown",
            "mousemove",
            "mouseout",
            "mouseover",
            "mouseup",
            "rightclick",
          ],
          p = 0;
        p < l.length;
        p++
      )
        !(function (o, n) {
          t[n] &&
            google.maps.event.addListener(o, n, function (o) {
              t[n].apply(this, [o]);
            });
        })(a, l[p]);
      return this.polylines.push(a), f.fire("polyline_added", a, this), a;
    }),
    (f.prototype.removePolyline = function (t) {
      for (var o = 0; o < this.polylines.length; o++)
        if (this.polylines[o] === t) {
          this.polylines[o].setMap(null),
            this.polylines.splice(o, 1),
            f.fire("polyline_removed", t, this);
          break;
        }
    }),
    (f.prototype.removePolylines = function () {
      for (var t, o = 0; (t = this.polylines[o]); o++) t.setMap(null);
      this.polylines = [];
    }),
    (f.prototype.drawCircle = function (t) {
      delete (t = i(
        { map: this.map, center: new google.maps.LatLng(t.lat, t.lng) },
        t
      )).lat,
        delete t.lng;
      for (
        var o = new google.maps.Circle(t),
          n = [
            "click",
            "dblclick",
            "mousedown",
            "mousemove",
            "mouseout",
            "mouseover",
            "mouseup",
            "rightclick",
          ],
          r = 0;
        r < n.length;
        r++
      )
        !(function (o, n) {
          t[n] &&
            google.maps.event.addListener(o, n, function (o) {
              t[n].apply(this, [o]);
            });
        })(o, n[r]);
      return this.polygons.push(o), o;
    }),
    (f.prototype.drawRectangle = function (t) {
      t = i({ map: this.map }, t);
      var o = new google.maps.LatLngBounds(
        new google.maps.LatLng(t.bounds[0][0], t.bounds[0][1]),
        new google.maps.LatLng(t.bounds[1][0], t.bounds[1][1])
      );
      t.bounds = o;
      for (
        var n = new google.maps.Rectangle(t),
          r = [
            "click",
            "dblclick",
            "mousedown",
            "mousemove",
            "mouseout",
            "mouseover",
            "mouseup",
            "rightclick",
          ],
          s = 0;
        s < r.length;
        s++
      )
        !(function (o, n) {
          t[n] &&
            google.maps.event.addListener(o, n, function (o) {
              t[n].apply(this, [o]);
            });
        })(n, r[s]);
      return this.polygons.push(n), n;
    }),
    (f.prototype.drawPolygon = function (t) {
      var o = !1;
      t.hasOwnProperty("useGeoJSON") && (o = t.useGeoJSON),
        delete t.useGeoJSON,
        (t = i({ map: this.map }, t)),
        !1 == o && (t.paths = [t.paths.slice(0)]),
        t.paths.length > 0 &&
          t.paths[0].length > 0 &&
          (t.paths = l(a(t.paths, c, o)));
      for (
        var n = new google.maps.Polygon(t),
          r = [
            "click",
            "dblclick",
            "mousedown",
            "mousemove",
            "mouseout",
            "mouseover",
            "mouseup",
            "rightclick",
          ],
          s = 0;
        s < r.length;
        s++
      )
        !(function (o, n) {
          t[n] &&
            google.maps.event.addListener(o, n, function (o) {
              t[n].apply(this, [o]);
            });
        })(n, r[s]);
      return this.polygons.push(n), f.fire("polygon_added", n, this), n;
    }),
    (f.prototype.removePolygon = function (t) {
      for (var o = 0; o < this.polygons.length; o++)
        if (this.polygons[o] === t) {
          this.polygons[o].setMap(null),
            this.polygons.splice(o, 1),
            f.fire("polygon_removed", t, this);
          break;
        }
    }),
    (f.prototype.removePolygons = function () {
      for (var t, o = 0; (t = this.polygons[o]); o++) t.setMap(null);
      this.polygons = [];
    }),
    (f.prototype.getFromFusionTables = function (t) {
      var o = t.events;
      delete t.events;
      var n = new google.maps.FusionTablesLayer(t);
      for (var r in o)
        !(function (t, n) {
          google.maps.event.addListener(t, n, function (t) {
            o[n].apply(this, [t]);
          });
        })(n, r);
      return this.layers.push(n), n;
    }),
    (f.prototype.loadFromFusionTables = function (t) {
      var o = this.getFromFusionTables(t);
      return o.setMap(this.map), o;
    }),
    (f.prototype.getFromKML = function (t) {
      var o = t.url,
        n = t.events;
      delete t.url, delete t.events;
      var r = new google.maps.KmlLayer(o, t);
      for (var s in n)
        !(function (t, o) {
          google.maps.event.addListener(t, o, function (t) {
            n[o].apply(this, [t]);
          });
        })(r, s);
      return this.layers.push(r), r;
    }),
    (f.prototype.loadFromKML = function (t) {
      var o = this.getFromKML(t);
      return o.setMap(this.map), o;
    }),
    (f.prototype.addLayer = function (t, o) {
      switch (((o = o || {}), t)) {
        case "weather":
          this.singleLayers.weather = n =
            new google.maps.weather.WeatherLayer();
          break;
        case "clouds":
          this.singleLayers.clouds = n = new google.maps.weather.CloudLayer();
          break;
        case "traffic":
          this.singleLayers.traffic = n = new google.maps.TrafficLayer();
          break;
        case "transit":
          this.singleLayers.transit = n = new google.maps.TransitLayer();
          break;
        case "bicycling":
          this.singleLayers.bicycling = n = new google.maps.BicyclingLayer();
          break;
        case "panoramio":
          (this.singleLayers.panoramio = n =
            new google.maps.panoramio.PanoramioLayer()),
            n.setTag(o.filter),
            delete o.filter,
            o.click &&
              google.maps.event.addListener(n, "click", function (t) {
                o.click(t), delete o.click;
              });
          break;
        case "places":
          if (
            ((this.singleLayers.places = n =
              new google.maps.places.PlacesService(this.map)),
            o.search || o.nearbySearch || o.radarSearch)
          ) {
            var n,
              r = {
                bounds: o.bounds || null,
                keyword: o.keyword || null,
                location: o.location || null,
                name: o.name || null,
                radius: o.radius || null,
                rankBy: o.rankBy || null,
                types: o.types || null,
              };
            o.radarSearch && n.radarSearch(r, o.radarSearch),
              o.search && n.search(r, o.search),
              o.nearbySearch && n.nearbySearch(r, o.nearbySearch);
          }
          if (o.textSearch) {
            var s = {
              bounds: o.bounds || null,
              location: o.location || null,
              query: o.query || null,
              radius: o.radius || null,
            };
            n.textSearch(s, o.textSearch);
          }
      }
      if (void 0 !== n)
        return (
          "function" == typeof n.setOptions && n.setOptions(o),
          "function" == typeof n.setMap && n.setMap(this.map),
          n
        );
    }),
    (f.prototype.removeLayer = function (t) {
      if ("string" == typeof t && void 0 !== this.singleLayers[t])
        this.singleLayers[t].setMap(null), delete this.singleLayers[t];
      else
        for (var o = 0; o < this.layers.length; o++)
          if (this.layers[o] === t) {
            this.layers[o].setMap(null), this.layers.splice(o, 1);
            break;
          }
    }),
    (f.prototype.getRoutes = function (n) {
      switch (n.travelMode) {
        case "bicycling":
          t = google.maps.TravelMode.BICYCLING;
          break;
        case "transit":
          t = google.maps.TravelMode.TRANSIT;
          break;
        case "driving":
          t = google.maps.TravelMode.DRIVING;
          break;
        default:
          t = google.maps.TravelMode.WALKING;
      }
      o =
        "imperial" === n.unitSystem
          ? google.maps.UnitSystem.IMPERIAL
          : google.maps.UnitSystem.METRIC;
      var r = i(
        {
          avoidHighways: !1,
          avoidTolls: !1,
          optimizeWaypoints: !1,
          waypoints: [],
        },
        n
      );
      (r.origin = /string/.test(typeof n.origin)
        ? n.origin
        : new google.maps.LatLng(n.origin[0], n.origin[1])),
        (r.destination = /string/.test(typeof n.destination)
          ? n.destination
          : new google.maps.LatLng(n.destination[0], n.destination[1])),
        (r.travelMode = t),
        (r.unitSystem = o),
        delete r.callback,
        delete r.error;
      var s = [];
      new google.maps.DirectionsService().route(r, function (t, o) {
        if (o === google.maps.DirectionsStatus.OK) {
          for (var r in t.routes)
            t.routes.hasOwnProperty(r) && s.push(t.routes[r]);
          n.callback && n.callback(s, t, o);
        } else n.error && n.error(t, o);
      });
    }),
    (f.prototype.removeRoutes = function () {
      this.routes.length = 0;
    }),
    (f.prototype.getElevations = function (t) {
      (t = i({ locations: [], path: !1, samples: 256 }, t)).locations.length >
        0 &&
        t.locations[0].length > 0 &&
        (t.locations = l(a([t.locations], c, !1)));
      var o = t.callback;
      delete t.callback;
      var n = new google.maps.ElevationService();
      if (t.path) {
        var r = { path: t.locations, samples: t.samples };
        n.getElevationAlongPath(r, function (t, n) {
          o && "function" == typeof o && o(t, n);
        });
      } else
        delete t.path,
          delete t.samples,
          n.getElevationForLocations(t, function (t, n) {
            o && "function" == typeof o && o(t, n);
          });
    }),
    (f.prototype.cleanRoute = f.prototype.removePolylines),
    (f.prototype.renderRoute = function (t, o) {
      var n,
        r =
          "string" == typeof o.panel
            ? document.getElementById(o.panel.replace("#", ""))
            : o.panel;
      (o.panel = r),
        (o = i({ map: this.map }, o)),
        (n = new google.maps.DirectionsRenderer(o)),
        this.getRoutes({
          origin: t.origin,
          destination: t.destination,
          travelMode: t.travelMode,
          waypoints: t.waypoints,
          unitSystem: t.unitSystem,
          error: t.error,
          avoidHighways: t.avoidHighways,
          avoidTolls: t.avoidTolls,
          optimizeWaypoints: t.optimizeWaypoints,
          callback: function (t, o, r) {
            r === google.maps.DirectionsStatus.OK && n.setDirections(o);
          },
        });
    }),
    (f.prototype.drawRoute = function (t) {
      var o = this;
      this.getRoutes({
        origin: t.origin,
        destination: t.destination,
        travelMode: t.travelMode,
        waypoints: t.waypoints,
        unitSystem: t.unitSystem,
        error: t.error,
        avoidHighways: t.avoidHighways,
        avoidTolls: t.avoidTolls,
        optimizeWaypoints: t.optimizeWaypoints,
        callback: function (n) {
          if (n.length > 0) {
            var r = {
              path: n[n.length - 1].overview_path,
              strokeColor: t.strokeColor,
              strokeOpacity: t.strokeOpacity,
              strokeWeight: t.strokeWeight,
            };
            t.hasOwnProperty("icons") && (r.icons = t.icons),
              o.drawPolyline(r),
              t.callback && t.callback(n[n.length - 1]);
          }
        },
      });
    }),
    (f.prototype.travelRoute = function (t) {
      if (t.origin && t.destination)
        this.getRoutes({
          origin: t.origin,
          destination: t.destination,
          travelMode: t.travelMode,
          waypoints: t.waypoints,
          unitSystem: t.unitSystem,
          error: t.error,
          callback: function (o) {
            if (
              (o.length > 0 && t.start && t.start(o[o.length - 1]),
              o.length > 0 && t.step)
            ) {
              var n = o[o.length - 1];
              if (n.legs.length > 0)
                for (var r, s = n.legs[0].steps, i = 0; (r = s[i]); i++)
                  (r.step_number = i), t.step(r, n.legs[0].steps.length - 1);
            }
            o.length > 0 && t.end && t.end(o[o.length - 1]);
          },
        });
      else if (t.route && t.route.legs.length > 0)
        for (var o, n = t.route.legs[0].steps, r = 0; (o = n[r]); r++)
          (o.step_number = r), t.step(o);
    }),
    (f.prototype.drawSteppedRoute = function (t) {
      var o = this;
      if (t.origin && t.destination)
        this.getRoutes({
          origin: t.origin,
          destination: t.destination,
          travelMode: t.travelMode,
          waypoints: t.waypoints,
          error: t.error,
          callback: function (n) {
            if (
              (n.length > 0 && t.start && t.start(n[n.length - 1]),
              n.length > 0 && t.step)
            ) {
              var r = n[n.length - 1];
              if (r.legs.length > 0)
                for (var s, i = r.legs[0].steps, a = 0; (s = i[a]); a++) {
                  s.step_number = a;
                  var l = {
                    path: s.path,
                    strokeColor: t.strokeColor,
                    strokeOpacity: t.strokeOpacity,
                    strokeWeight: t.strokeWeight,
                  };
                  t.hasOwnProperty("icons") && (l.icons = t.icons),
                    o.drawPolyline(l),
                    t.step(s, r.legs[0].steps.length - 1);
                }
            }
            n.length > 0 && t.end && t.end(n[n.length - 1]);
          },
        });
      else if (t.route && t.route.legs.length > 0)
        for (var n, r = t.route.legs[0].steps, s = 0; (n = r[s]); s++) {
          n.step_number = s;
          var i = {
            path: n.path,
            strokeColor: t.strokeColor,
            strokeOpacity: t.strokeOpacity,
            strokeWeight: t.strokeWeight,
          };
          t.hasOwnProperty("icons") && (i.icons = t.icons),
            o.drawPolyline(i),
            t.step(n);
        }
    }),
    (f.Route = function (t) {
      (this.origin = t.origin),
        (this.destination = t.destination),
        (this.waypoints = t.waypoints),
        (this.map = t.map),
        (this.route = t.route),
        (this.step_count = 0),
        (this.steps = this.route.legs[0].steps),
        (this.steps_length = this.steps.length);
      var o = {
        path: new google.maps.MVCArray(),
        strokeColor: t.strokeColor,
        strokeOpacity: t.strokeOpacity,
        strokeWeight: t.strokeWeight,
      };
      t.hasOwnProperty("icons") && (o.icons = t.icons),
        (this.polyline = this.map.drawPolyline(o).getPath());
    }),
    (f.Route.prototype.getRoute = function (t) {
      var o = this;
      this.map.getRoutes({
        origin: this.origin,
        destination: this.destination,
        travelMode: t.travelMode,
        waypoints: this.waypoints || [],
        error: t.error,
        callback: function () {
          (o.route = e[0]), t.callback && t.callback.call(o);
        },
      });
    }),
    (f.Route.prototype.back = function () {
      if (this.step_count > 0) {
        this.step_count--;
        var t = this.route.legs[0].steps[this.step_count].path;
        for (var o in t) t.hasOwnProperty(o) && this.polyline.pop();
      }
    }),
    (f.Route.prototype.forward = function () {
      if (this.step_count < this.steps_length) {
        var t = this.route.legs[0].steps[this.step_count].path;
        for (var o in t) t.hasOwnProperty(o) && this.polyline.push(t[o]);
        this.step_count++;
      }
    }),
    (f.prototype.checkGeofence = function (t, o, n) {
      return n.containsLatLng(new google.maps.LatLng(t, o));
    }),
    (f.prototype.checkMarkerGeofence = function (t, o) {
      if (t.fences)
        for (var n, r = 0; (n = t.fences[r]); r++) {
          var s = t.getPosition();
          this.checkGeofence(s.lat(), s.lng(), n) || o(t, n);
        }
    }),
    (f.prototype.toImage = function (t) {
      var t = t || {},
        o = {};
      if (
        ((o.size = t.size || [this.el.clientWidth, this.el.clientHeight]),
        (o.lat = this.getCenter().lat()),
        (o.lng = this.getCenter().lng()),
        this.markers.length > 0)
      ) {
        o.markers = [];
        for (var n = 0; n < this.markers.length; n++)
          o.markers.push({
            lat: this.markers[n].getPosition().lat(),
            lng: this.markers[n].getPosition().lng(),
          });
      }
      if (this.polylines.length > 0) {
        var r = this.polylines[0];
        (o.polyline = {}),
          (o.polyline.path = google.maps.geometry.encoding.encodePath(
            r.getPath()
          )),
          (o.polyline.strokeColor = r.strokeColor),
          (o.polyline.strokeOpacity = r.strokeOpacity),
          (o.polyline.strokeWeight = r.strokeWeight);
      }
      return f.staticMapURL(o);
    }),
    (f.staticMapURL = function (t) {
      var o,
        n = [],
        r =
          ("file:" === location.protocol ? "http:" : location.protocol) +
          "//maps.googleapis.com/maps/api/staticmap";
      t.url && ((r = t.url), delete t.url), (r += "?");
      var s = t.markers;
      delete t.markers, !s && t.marker && ((s = [t.marker]), delete t.marker);
      var i = t.styles;
      delete t.styles;
      var a = t.polyline;
      if ((delete t.polyline, t.center))
        n.push("center=" + t.center), delete t.center;
      else if (t.address) n.push("center=" + t.address), delete t.address;
      else if (t.lat)
        n.push(["center=", t.lat, ",", t.lng].join("")),
          delete t.lat,
          delete t.lng;
      else if (t.visible) {
        var l = encodeURI(t.visible.join("|"));
        n.push("visible=" + l);
      }
      var p = t.size;
      p ? (p.join && (p = p.join("x")), delete t.size) : (p = "630x300"),
        n.push("size=" + p),
        t.zoom || !1 === t.zoom || (t.zoom = 15);
      var c = !t.hasOwnProperty("sensor") || !!t.sensor;
      for (var h in (delete t.sensor, n.push("sensor=" + c), t))
        t.hasOwnProperty(h) && n.push(h + "=" + t[h]);
      if (s)
        for (var u = 0; (o = s[u]); u++) {
          for (var h in ((b = []),
          o.size && "normal" !== o.size
            ? (b.push("size:" + o.size), delete o.size)
            : o.icon && (b.push("icon:" + encodeURI(o.icon)), delete o.icon),
          o.color &&
            (b.push("color:" + o.color.replace("#", "0x")), delete o.color),
          o.label &&
            (b.push("label:" + o.label[0].toUpperCase()), delete o.label),
          (x = o.address ? o.address : o.lat + "," + o.lng),
          delete o.address,
          delete o.lat,
          delete o.lng,
          o))
            o.hasOwnProperty(h) && b.push(h + ":" + o[h]);
          b.length || 0 === u
            ? (b.push(x), (b = b.join("|")), n.push("markers=" + encodeURI(b)))
            : ((b = n.pop() + encodeURI("|" + x)), n.push(b));
        }
      if (i)
        for (var u = 0; u < i.length; u++) {
          var d = [];
          i[u].featureType &&
            d.push("feature:" + i[u].featureType.toLowerCase()),
            i[u].elementType &&
              d.push("element:" + i[u].elementType.toLowerCase());
          for (var f = 0; f < i[u].stylers.length; f++)
            for (var m in i[u].stylers[f]) {
              var g = i[u].stylers[f][m];
              ("hue" == m || "color" == m) && (g = "0x" + g.substring(1)),
                d.push(m + ":" + g);
            }
          var y = d.join("|");
          "" != y && n.push("style=" + y);
        }
      function v(t, o) {
        if ("#" === t[0] && ((t = t.replace("#", "0x")), o)) {
          if (0 === (o = Math.min(1, Math.max((o = parseFloat(o)), 0))))
            return "0x00000000";
          1 === (o = (255 * o).toString(16)).length && (o += o),
            (t = t.slice(0, 8) + o);
        }
        return t;
      }
      if (a) {
        if (
          ((o = a),
          (a = []),
          o.strokeWeight && a.push("weight:" + parseInt(o.strokeWeight, 10)),
          o.strokeColor)
        ) {
          var k = v(o.strokeColor, o.strokeOpacity);
          a.push("color:" + k);
        }
        if (o.fillColor) {
          var w = v(o.fillColor, o.fillOpacity);
          a.push("fillcolor:" + w);
        }
        var L = o.path;
        if (L.join)
          for (var b, x, M, f = 0; (M = L[f]); f++) a.push(M.join(","));
        else a.push("enc:" + L);
        (a = a.join("|")), n.push("path=" + encodeURI(a));
      }
      var C = window.devicePixelRatio || 1;
      return n.push("scale=" + C), r + (n = n.join("&"));
    }),
    (f.prototype.addMapType = function (t, o) {
      if (o.hasOwnProperty("getTileUrl") && "function" == typeof o.getTileUrl) {
        o.tileSize = o.tileSize || new google.maps.Size(256, 256);
        var n = new google.maps.ImageMapType(o);
        this.map.mapTypes.set(t, n);
      } else throw "'getTileUrl' function required.";
    }),
    (f.prototype.addOverlayMapType = function (t) {
      if (t.hasOwnProperty("getTile") && "function" == typeof t.getTile) {
        var o = t.index;
        delete t.index, this.map.overlayMapTypes.insertAt(o, t);
      } else throw "'getTile' function required.";
    }),
    (f.prototype.removeOverlayMapType = function (t) {
      this.map.overlayMapTypes.removeAt(t);
    }),
    (f.prototype.addStyle = function (t) {
      var o = new google.maps.StyledMapType(t.styles, {
        name: t.styledMapName,
      });
      this.map.mapTypes.set(t.mapTypeId, o);
    }),
    (f.prototype.setStyle = function (t) {
      this.map.setMapTypeId(t);
    }),
    (f.prototype.createPanorama = function (t) {
      return (
        (t.hasOwnProperty("lat") && t.hasOwnProperty("lng")) ||
          ((t.lat = this.getCenter().lat()), (t.lng = this.getCenter().lng())),
        (this.panorama = f.createPanorama(t)),
        this.map.setStreetView(this.panorama),
        this.panorama
      );
    }),
    (f.createPanorama = function (t) {
      var o = u(t.el, t.context);
      (t.position = new google.maps.LatLng(t.lat, t.lng)),
        delete t.el,
        delete t.context,
        delete t.lat,
        delete t.lng;
      for (
        var n = [
            "closeclick",
            "links_changed",
            "pano_changed",
            "position_changed",
            "pov_changed",
            "resize",
            "visible_changed",
          ],
          r = i({ visible: !0 }, t),
          s = 0;
        s < n.length;
        s++
      )
        delete r[n[s]];
      for (
        var a = new google.maps.StreetViewPanorama(o, r), s = 0;
        s < n.length;
        s++
      )
        !(function (o, n) {
          t[n] &&
            google.maps.event.addListener(o, n, function () {
              t[n].apply(this);
            });
        })(a, n[s]);
      return a;
    }),
    (f.prototype.on = function (t, o) {
      return f.on(t, this, o);
    }),
    (f.prototype.off = function (t) {
      f.off(t, this);
    }),
    (f.prototype.once = function (t, o) {
      return f.once(t, this, o);
    }),
    (f.custom_events = [
      "marker_added",
      "marker_removed",
      "polyline_added",
      "polyline_removed",
      "polygon_added",
      "polygon_removed",
      "geolocated",
      "geolocation_failed",
    ]),
    (f.on = function (t, o, n) {
      if (-1 == f.custom_events.indexOf(t))
        return (
          o instanceof f && (o = o.map), google.maps.event.addListener(o, t, n)
        );
      var r = { handler: n, eventName: t };
      return (
        (o.registered_events[t] = o.registered_events[t] || []),
        o.registered_events[t].push(r),
        r
      );
    }),
    (f.off = function (t, o) {
      -1 == f.custom_events.indexOf(t)
        ? (o instanceof f && (o = o.map),
          google.maps.event.clearListeners(o, t))
        : (o.registered_events[t] = []);
    }),
    (f.once = function (t, o, n) {
      if (-1 == f.custom_events.indexOf(t))
        return (
          o instanceof f && (o = o.map),
          google.maps.event.addListenerOnce(o, t, n)
        );
    }),
    (f.fire = function (t, o, n) {
      if (-1 == f.custom_events.indexOf(t))
        google.maps.event.trigger(
          o,
          t,
          Array.prototype.slice.apply(arguments).slice(2)
        );
      else if (t in n.registered_events)
        for (var r = n.registered_events[t], s = 0; s < r.length; s++)
          !(function (t, o, n) {
            t.apply(o, [n]);
          })(r[s].handler, n, o);
    }),
    (f.geolocate = function (t) {
      var o = t.always || t.complete;
      navigator.geolocation
        ? navigator.geolocation.getCurrentPosition(
            function (n) {
              t.success(n), o && o();
            },
            function (n) {
              t.error(n), o && o();
            },
            t.options
          )
        : (t.not_supported(), o && o());
    }),
    (f.geocode = function (t) {
      this.geocoder = new google.maps.Geocoder();
      var o = t.callback;
      t.hasOwnProperty("lat") &&
        t.hasOwnProperty("lng") &&
        (t.latLng = new google.maps.LatLng(t.lat, t.lng)),
        delete t.lat,
        delete t.lng,
        delete t.callback,
        this.geocoder.geocode(t, function (t, n) {
          o(t, n);
        });
    }),
    "object" == typeof window.google &&
      window.google.maps &&
      (google.maps.Polygon.prototype.getBounds ||
        (google.maps.Polygon.prototype.getBounds = function (t) {
          for (
            var o,
              n = new google.maps.LatLngBounds(),
              r = this.getPaths(),
              s = 0;
            s < r.getLength();
            s++
          ) {
            o = r.getAt(s);
            for (var i = 0; i < o.getLength(); i++) n.extend(o.getAt(i));
          }
          return n;
        }),
      google.maps.Polygon.prototype.containsLatLng ||
        (google.maps.Polygon.prototype.containsLatLng = function (t) {
          var o = this.getBounds();
          if (null !== o && !o.contains(t)) return !1;
          for (var n = !1, r = this.getPaths().getLength(), s = 0; s < r; s++)
            for (
              var i = this.getPaths().getAt(s),
                a = i.getLength(),
                l = a - 1,
                p = 0;
              p < a;
              p++
            ) {
              var c = i.getAt(p),
                h = i.getAt(l);
              ((c.lng() < t.lng() && h.lng() >= t.lng()) ||
                (h.lng() < t.lng() && c.lng() >= t.lng())) &&
                c.lat() +
                  ((t.lng() - c.lng()) / (h.lng() - c.lng())) *
                    (h.lat() - c.lat()) <
                  t.lat() &&
                (n = !n),
                (l = p);
            }
          return n;
        }),
      google.maps.Circle.prototype.containsLatLng ||
        (google.maps.Circle.prototype.containsLatLng = function (t) {
          return (
            !google.maps.geometry ||
            google.maps.geometry.spherical.computeDistanceBetween(
              this.getCenter(),
              t
            ) <= this.getRadius()
          );
        }),
      (google.maps.Rectangle.prototype.containsLatLng = function (t) {
        return this.getBounds().contains(t);
      }),
      (google.maps.LatLngBounds.prototype.containsLatLng = function (t) {
        return this.contains(t);
      }),
      (google.maps.Marker.prototype.setFences = function (t) {
        this.fences = t;
      }),
      (google.maps.Marker.prototype.addFence = function (t) {
        this.fences.push(t);
      }),
      (google.maps.Marker.prototype.getId = function () {
        return this.__gm_id;
      })),
    Array.prototype.indexOf ||
      (Array.prototype.indexOf = function (t) {
        if (this == null) throw TypeError();
        var o = Object(this),
          n = o.length >>> 0;
        if (0 === n) return -1;
        var r = 0;
        if (
          (arguments.length > 1 &&
            ((r = Number(arguments[1])),
            r != r
              ? (r = 0)
              : 0 != r &&
                r != 1 / 0 &&
                r != -1 / 0 &&
                (r = (r > 0 || -1) * Math.floor(Math.abs(r)))),
          r >= n)
        )
          return -1;
        for (var s = r >= 0 ? r : Math.max(n - Math.abs(r), 0); s < n; s++)
          if (s in o && o[s] === t) return s;
        return -1;
      }),
    f
  );
});
