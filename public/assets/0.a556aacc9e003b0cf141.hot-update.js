webpackHotUpdate(0,{29:function(t,n,d){"use strict";const e=d(30),o=d(59),s=d(68),r=e(),a=o().configure(s(r)),c=a.service("sensors"),l=a.service("robot");c.on("updated",t=>console.log("Sensors updated:",t)),l.on("updated",t=>{document.getElementById("robotStats").innerHTML=g(t.robot)}),window.hx=a;document.getElementById("robot.start").addEventListener("click",function(){l.create({command:"start"}),console.log("Robot started.")});const g=t=>`<table id="robotStats" class="hxstats">\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>${i(t.legs[0],!0)}</td>\n\t\t\t\t\t\t<td>0</td>\n\t\t\t\t\t\t<td>1</td>\n\t\t\t\t\t\t<td>${i(t.legs[1],!1)}</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>${i(t.legs[2],!0)}</td>\n\t\t\t\t\t\t<td>2</td>\n\t\t\t\t\t\t<td>3</td>\n\t\t\t\t\t\t<td>${i(t.legs[3],!1)}</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>${i(t.legs[4],!0)}</td>\n\t\t\t\t\t\t<td>4</td>\n\t\t\t\t\t\t<td>5</td>\n\t\t\t\t\t\t<td>${i(t.legs[5],!1)}</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>`,i=(t,n)=>n?`${t.position} ${t.angle}&deg;`:`${t.angle}&deg; ${t.position}`}});