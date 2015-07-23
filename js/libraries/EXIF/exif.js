
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
395
396
397
398
399
400
401
402
403
404
405
406
407
408
409
410
411
412
413
414
415
416
417
418
419
420
421
422
423
424
425
426
427
428
429
430
431
432
433
434
435
436
437
438
439
440
441
442
443
444
445
446
447
448
449
450
451
452
453
454
455
456
457
458
459
460
461
462
463
464
465
466
467
468
469
470
471
472
473
474
475
476
477
478
479
480
481
482
483
484
485
486
487
488
489
490
491
492
493
494
495
496
497
498
499
500
501
502
503
504
505
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
574
575
576
577
578
579
580
581
582
583
584
585
586
587
588
589
590
591
592
593
594
595
596
597
598
599
600
601
602
603
604
605
606
607
608
609
610
611
612
613
614
615
616
617
618
619
620
621
622
623
624
625
626
627
628
629
/*
 * Javascript EXIF Reader 0.1.4
 * Copyright (c) 2008 Jacob Seidelin, cupboy@gmail.com, http://blog.nihilogic.dk/
 * Licensed under the MPL License [http://www.nihilogic.dk/licenses/mpl-license.txt]
 */
 
 
var EXIF = {};
 
(function() {
 
var bDebug = false;
 
EXIF.Tags = {
 
	// version tags
	0x9000 : "ExifVersion",			// EXIF version
	0xA000 : "FlashpixVersion",		// Flashpix format version
 
	// colorspace tags
	0xA001 : "ColorSpace",			// Color space information tag
 
	// image configuration
	0xA002 : "PixelXDimension",		// Valid width of meaningful image
	0xA003 : "PixelYDimension",		// Valid height of meaningful image
	0x9101 : "ComponentsConfiguration",	// Information about channels
	0x9102 : "CompressedBitsPerPixel",	// Compressed bits per pixel
 
	// user information
	0x927C : "MakerNote",			// Any desired information written by the manufacturer
	0x9286 : "UserComment",			// Comments by user
 
	// related file
	0xA004 : "RelatedSoundFile",		// Name of related sound file
 
	// date and time
	0x9003 : "DateTimeOriginal",		// Date and time when the original image was generated
	0x9004 : "DateTimeDigitized",		// Date and time when the image was stored digitally
	0x9290 : "SubsecTime",			// Fractions of seconds for DateTime
	0x9291 : "SubsecTimeOriginal",		// Fractions of seconds for DateTimeOriginal
	0x9292 : "SubsecTimeDigitized",		// Fractions of seconds for DateTimeDigitized
 
	// picture-taking conditions
	0x829A : "ExposureTime",		// Exposure time (in seconds)
	0x829D : "FNumber",			// F number
	0x8822 : "ExposureProgram",		// Exposure program
	0x8824 : "SpectralSensitivity",		// Spectral sensitivity
	0x8827 : "ISOSpeedRatings",		// ISO speed rating
	0x8828 : "OECF",			// Optoelectric conversion factor
	0x9201 : "ShutterSpeedValue",		// Shutter speed
	0x9202 : "ApertureValue",		// Lens aperture
	0x9203 : "BrightnessValue",		// Value of brightness
	0x9204 : "ExposureBias",		// Exposure bias
	0x9205 : "MaxApertureValue",		// Smallest F number of lens
	0x9206 : "SubjectDistance",		// Distance to subject in meters
	0x9207 : "MeteringMode", 		// Metering mode
	0x9208 : "LightSource",			// Kind of light source
	0x9209 : "Flash",			// Flash status
	0x9214 : "SubjectArea",			// Location and area of main subject
	0x920A : "FocalLength",			// Focal length of the lens in mm
	0xA20B : "FlashEnergy",			// Strobe energy in BCPS
	0xA20C : "SpatialFrequencyResponse",	// 
	0xA20E : "FocalPlaneXResolution", 	// Number of pixels in width direction per FocalPlaneResolutionUnit
	0xA20F : "FocalPlaneYResolution", 	// Number of pixels in height direction per FocalPlaneResolutionUnit
	0xA210 : "FocalPlaneResolutionUnit", 	// Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
	0xA214 : "SubjectLocation",		// Location of subject in image
	0xA215 : "ExposureIndex",		// Exposure index selected on camera
	0xA217 : "SensingMethod", 		// Image sensor type
	0xA300 : "FileSource", 			// Image source (3 == DSC)
	0xA301 : "SceneType", 			// Scene type (1 == directly photographed)
	0xA302 : "CFAPattern",			// Color filter array geometric pattern
	0xA401 : "CustomRendered",		// Special processing
	0xA402 : "ExposureMode",		// Exposure mode
	0xA403 : "WhiteBalance",		// 1 = auto white balance, 2 = manual
	0xA404 : "DigitalZoomRation",		// Digital zoom ratio
	0xA405 : "FocalLengthIn35mmFilm",	// Equivalent foacl length assuming 35mm film camera (in mm)
	0xA406 : "SceneCaptureType",		// Type of scene
	0xA407 : "GainControl",			// Degree of overall image gain adjustment
	0xA408 : "Contrast",			// Direction of contrast processing applied by camera
	0xA409 : "Saturation", 			// Direction of saturation processing applied by camera
	0xA40A : "Sharpness",			// Direction of sharpness processing applied by camera
	0xA40B : "DeviceSettingDescription",	// 
	0xA40C : "SubjectDistanceRange",	// Distance to subject
 
	// other tags
	0xA005 : "InteroperabilityIFDPointer",
	0xA420 : "ImageUniqueID"		// Identifier assigned uniquely to each image
};
 
EXIF.TiffTags = {
	0x0100 : "ImageWidth",
	0x0101 : "ImageHeight",
	0x8769 : "ExifIFDPointer",
	0x8825 : "GPSInfoIFDPointer",
	0xA005 : "InteroperabilityIFDPointer",
	0x0102 : "BitsPerSample",
	0x0103 : "Compression",
	0x0106 : "PhotometricInterpretation",
	0x0112 : "Orientation",
	0x0115 : "SamplesPerPixel",
	0x011C : "PlanarConfiguration",
	0x0212 : "YCbCrSubSampling",
	0x0213 : "YCbCrPositioning",
	0x011A : "XResolution",
	0x011B : "YResolution",
	0x0128 : "ResolutionUnit",
	0x0111 : "StripOffsets",
	0x0116 : "RowsPerStrip",
	0x0117 : "StripByteCounts",
	0x0201 : "JPEGInterchangeFormat",
	0x0202 : "JPEGInterchangeFormatLength",
	0x012D : "TransferFunction",
	0x013E : "WhitePoint",
	0x013F : "PrimaryChromaticities",
	0x0211 : "YCbCrCoefficients",
	0x0214 : "ReferenceBlackWhite",
	0x0132 : "DateTime",
	0x010E : "ImageDescription",
	0x010F : "Make",
	0x0110 : "Model",
	0x0131 : "Software",
	0x013B : "Artist",
	0x8298 : "Copyright"
}
 
EXIF.GPSTags = {
	0x0000 : "GPSVersionID",
	0x0001 : "GPSLatitudeRef",
	0x0002 : "GPSLatitude",
	0x0003 : "GPSLongitudeRef",
	0x0004 : "GPSLongitude",
	0x0005 : "GPSAltitudeRef",
	0x0006 : "GPSAltitude",
	0x0007 : "GPSTimeStamp",
	0x0008 : "GPSSatellites",
	0x0009 : "GPSStatus",
	0x000A : "GPSMeasureMode",
	0x000B : "GPSDOP",
	0x000C : "GPSSpeedRef",
	0x000D : "GPSSpeed",
	0x000E : "GPSTrackRef",
	0x000F : "GPSTrack",
	0x0010 : "GPSImgDirectionRef",
	0x0011 : "GPSImgDirection",
	0x0012 : "GPSMapDatum",
	0x0013 : "GPSDestLatitudeRef",
	0x0014 : "GPSDestLatitude",
	0x0015 : "GPSDestLongitudeRef",
	0x0016 : "GPSDestLongitude",
	0x0017 : "GPSDestBearingRef",
	0x0018 : "GPSDestBearing",
	0x0019 : "GPSDestDistanceRef",
	0x001A : "GPSDestDistance",
	0x001B : "GPSProcessingMethod",
	0x001C : "GPSAreaInformation",
	0x001D : "GPSDateStamp",
	0x001E : "GPSDifferential"
}
 
EXIF.StringValues = {
	ExposureProgram : {
		0 : "Not defined",
		1 : "Manual",
		2 : "Normal program",
		3 : "Aperture priority",
		4 : "Shutter priority",
		5 : "Creative program",
		6 : "Action program",
		7 : "Portrait mode",
		8 : "Landscape mode"
	},
	MeteringMode : {
		0 : "Unknown",
		1 : "Average",
		2 : "CenterWeightedAverage",
		3 : "Spot",
		4 : "MultiSpot",
		5 : "Pattern",
		6 : "Partial",
		255 : "Other"
	},
	LightSource : {
		0 : "Unknown",
		1 : "Daylight",
		2 : "Fluorescent",
		3 : "Tungsten (incandescent light)",
		4 : "Flash",
		9 : "Fine weather",
		10 : "Cloudy weather",
		11 : "Shade",
		12 : "Daylight fluorescent (D 5700 - 7100K)",
		13 : "Day white fluorescent (N 4600 - 5400K)",
		14 : "Cool white fluorescent (W 3900 - 4500K)",
		15 : "White fluorescent (WW 3200 - 3700K)",
		17 : "Standard light A",
		18 : "Standard light B",
		19 : "Standard light C",
		20 : "D55",
		21 : "D65",
		22 : "D75",
		23 : "D50",
		24 : "ISO studio tungsten",
		255 : "Other"
	},
	Flash : {
		0x0000 : "Flash did not fire",
		0x0001 : "Flash fired",
		0x0005 : "Strobe return light not detected",
		0x0007 : "Strobe return light detected",
		0x0009 : "Flash fired, compulsory flash mode",
		0x000D : "Flash fired, compulsory flash mode, return light not detected",
		0x000F : "Flash fired, compulsory flash mode, return light detected",
		0x0010 : "Flash did not fire, compulsory flash mode",
		0x0018 : "Flash did not fire, auto mode",
		0x0019 : "Flash fired, auto mode",
		0x001D : "Flash fired, auto mode, return light not detected",
		0x001F : "Flash fired, auto mode, return light detected",
		0x0020 : "No flash function",
		0x0041 : "Flash fired, red-eye reduction mode",
		0x0045 : "Flash fired, red-eye reduction mode, return light not detected",
		0x0047 : "Flash fired, red-eye reduction mode, return light detected",
		0x0049 : "Flash fired, compulsory flash mode, red-eye reduction mode",
		0x004D : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
		0x004F : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
		0x0059 : "Flash fired, auto mode, red-eye reduction mode",
		0x005D : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
		0x005F : "Flash fired, auto mode, return light detected, red-eye reduction mode"
	},
	SensingMethod : {
		1 : "Not defined",
		2 : "One-chip color area sensor",
		3 : "Two-chip color area sensor",
		4 : "Three-chip color area sensor",
		5 : "Color sequential area sensor",
		7 : "Trilinear sensor",
		8 : "Color sequential linear sensor"
	},
	SceneCaptureType : {
		0 : "Standard",
		1 : "Landscape",
		2 : "Portrait",
		3 : "Night scene"
	},
	SceneType : {
		1 : "Directly photographed"
	},
	CustomRendered : {
		0 : "Normal process",
		1 : "Custom process"
	},
	WhiteBalance : {
		0 : "Auto white balance",
		1 : "Manual white balance"
	},
	GainControl : {
		0 : "None",
		1 : "Low gain up",
		2 : "High gain up",
		3 : "Low gain down",
		4 : "High gain down"
	},
	Contrast : {
		0 : "Normal",
		1 : "Soft",
		2 : "Hard"
	},
	Saturation : {
		0 : "Normal",
		1 : "Low saturation",
		2 : "High saturation"
	},
	Sharpness : {
		0 : "Normal",
		1 : "Soft",
		2 : "Hard"
	},
	SubjectDistanceRange : {
		0 : "Unknown",
		1 : "Macro",
		2 : "Close view",
		3 : "Distant view"
	},
	FileSource : {
		3 : "DSC"
	},
 
	Components : {
		0 : "",
		1 : "Y",
		2 : "Cb",
		3 : "Cr",
		4 : "R",
		5 : "G",
		6 : "B"
	}
}
 
function addEvent(oElement, strEvent, fncHandler) 
{
	if (oElement.addEventListener) { 
		oElement.addEventListener(strEvent, fncHandler, false); 
	} else if (oElement.attachEvent) { 
		oElement.attachEvent("on" + strEvent, fncHandler); 
	}
}
 
 
function imageHasData(oImg) 
{
	return !!(oImg.exifdata);
}
 
function getImageData(oImg, fncCallback) 
{
	BinaryAjax(
		oImg.src,
		function(oHTTP) {
			var oEXIF = findEXIFinJPEG(oHTTP.binaryResponse);
			oImg.exifdata = oEXIF || {};
			if (fncCallback) fncCallback();
		}
	)
}
 
function findEXIFinJPEG(oFile) {
	var aMarkers = [];
 
	if (oFile.getByteAt(0) != 0xFF || oFile.getByteAt(1) != 0xD8) {
		return false; // not a valid jpeg
	}
 
	var iOffset = 2;
	var iLength = oFile.getLength();
	while (iOffset < iLength) {
		if (oFile.getByteAt(iOffset) != 0xFF) {
			if (bDebug) console.log("Not a valid marker at offset " + iOffset + ", found: " + oFile.getByteAt(iOffset));
			return false; // not a valid marker, something is wrong
		}
 
		var iMarker = oFile.getByteAt(iOffset+1);
 
		// we could implement handling for other markers here, 
		// but we're only looking for 0xFFE1 for EXIF data
 
		if (iMarker == 22400) {
			if (bDebug) console.log("Found 0xFFE1 marker");
			return readEXIFData(oFile, iOffset + 4, oFile.getShortAt(iOffset+2, true)-2);
			iOffset += 2 + oFile.getShortAt(iOffset+2, true);
 
		} else if (iMarker == 225) {
			// 0xE1 = Application-specific 1 (for EXIF)
			if (bDebug) console.log("Found 0xFFE1 marker");
			return readEXIFData(oFile, iOffset + 4, oFile.getShortAt(iOffset+2, true)-2);
 
		} else {
			iOffset += 2 + oFile.getShortAt(iOffset+2, true);
		}
 
	}
 
}
 
 
function readTags(oFile, iTIFFStart, iDirStart, oStrings, bBigEnd) 
{
	var iEntries = oFile.getShortAt(iDirStart, bBigEnd);
	var oTags = {};
	for (var i=0;i<iEntries;i++) {
		var iEntryOffset = iDirStart + i*12 + 2;
		var strTag = oStrings[oFile.getShortAt(iEntryOffset, bBigEnd)];
		if (!strTag && bDebug) console.log("Unknown tag: " + oFile.getShortAt(iEntryOffset, bBigEnd));
		oTags[strTag] = readTagValue(oFile, iEntryOffset, iTIFFStart, iDirStart, bBigEnd);
	}
	return oTags;
}
 
 
function readTagValue(oFile, iEntryOffset, iTIFFStart, iDirStart, bBigEnd)
{
	var iType = oFile.getShortAt(iEntryOffset+2, bBigEnd);
	var iNumValues = oFile.getLongAt(iEntryOffset+4, bBigEnd);
	var iValueOffset = oFile.getLongAt(iEntryOffset+8, bBigEnd) + iTIFFStart;
 
	switch (iType) {
		case 1: // byte, 8-bit unsigned int
		case 7: // undefined, 8-bit byte, value depending on field
			if (iNumValues == 1) {
				return oFile.getByteAt(iEntryOffset + 8, bBigEnd);
			} else {
				var iValOffset = iNumValues > 4 ? iValueOffset : (iEntryOffset + 8);
				var aVals = [];
				for (var n=0;n<iNumValues;n++) {
					aVals[n] = oFile.getByteAt(iValOffset + n);
				}
				return aVals;
			}
			break;
 
		case 2: // ascii, 8-bit byte
			var iStringOffset = iNumValues > 4 ? iValueOffset : (iEntryOffset + 8);
			return oFile.getStringAt(iStringOffset, iNumValues-1);
			break;
 
		case 3: // short, 16 bit int
			if (iNumValues == 1) {
				return oFile.getShortAt(iEntryOffset + 8, bBigEnd);
			} else {
				var iValOffset = iNumValues > 2 ? iValueOffset : (iEntryOffset + 8);
				var aVals = [];
				for (var n=0;n<iNumValues;n++) {
					aVals[n] = oFile.getShortAt(iValOffset + 2*n, bBigEnd);
				}
				return aVals;
			}
			break;
 
		case 4: // long, 32 bit int
			if (iNumValues == 1) {
				return oFile.getLongAt(iEntryOffset + 8, bBigEnd);
			} else {
				var aVals = [];
				for (var n=0;n<iNumValues;n++) {
					aVals[n] = oFile.getLongAt(iValueOffset + 4*n, bBigEnd);
				}
				return aVals;
			}
			break;
		case 5:	// rational = two long values, first is numerator, second is denominator
			if (iNumValues == 1) {
				return oFile.getLongAt(iValueOffset, bBigEnd) / oFile.getLongAt(iValueOffset+4, bBigEnd);
			} else {
				var aVals = [];
				for (var n=0;n<iNumValues;n++) {
					aVals[n] = oFile.getLongAt(iValueOffset + 8*n, bBigEnd) / oFile.getLongAt(iValueOffset+4 + 8*n, bBigEnd);
				}
				return aVals;
			}
			break;
		case 9: // slong, 32 bit signed int
			if (iNumValues == 1) {
				return oFile.getSLongAt(iEntryOffset + 8, bBigEnd);
			} else {
				var aVals = [];
				for (var n=0;n<iNumValues;n++) {
					aVals[n] = oFile.getSLongAt(iValueOffset + 4*n, bBigEnd);
				}
				return aVals;
			}
			break;
		case 10: // signed rational, two slongs, first is numerator, second is denominator
			if (iNumValues == 1) {
				return oFile.getSLongAt(iValueOffset, bBigEnd) / oFile.getSLongAt(iValueOffset+4, bBigEnd);
			} else {
				var aVals = [];
				for (var n=0;n<iNumValues;n++) {
					aVals[n] = oFile.getSLongAt(iValueOffset + 8*n, bBigEnd) / oFile.getSLongAt(iValueOffset+4 + 8*n, bBigEnd);
				}
				return aVals;
			}
			break;
	}
}
 
 
function readEXIFData(oFile, iStart, iLength) 
{
	if (oFile.getStringAt(iStart, 4) != "Exif") {
		if (bDebug) console.log("Not valid EXIF data! " + oFile.getStringAt(iStart, 4));
		return false;
	}
 
	var bBigEnd;
 
	var iTIFFOffset = iStart + 6;
 
	// test for TIFF validity and endianness
	if (oFile.getShortAt(iTIFFOffset) == 0x4949) {
		bBigEnd = false;
	} else if (oFile.getShortAt(iTIFFOffset) == 0x4D4D) {
		bBigEnd = true;
	} else {
		if (bDebug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
		return false;
	}
 
	if (oFile.getShortAt(iTIFFOffset+2, bBigEnd) != 0x002A) {
		if (bDebug) console.log("Not valid TIFF data! (no 0x002A)");
		return false;
	}
 
	if (oFile.getLongAt(iTIFFOffset+4, bBigEnd) != 0x00000008) {
		if (bDebug) console.log("Not valid TIFF data! (First offset not 8)", oFile.getShortAt(iTIFFOffset+4, bBigEnd));
		return false;
	}
 
	var oTags = readTags(oFile, iTIFFOffset, iTIFFOffset+8, EXIF.TiffTags, bBigEnd);
 
	if (oTags.ExifIFDPointer) {
		var oEXIFTags = readTags(oFile, iTIFFOffset, iTIFFOffset + oTags.ExifIFDPointer, EXIF.Tags, bBigEnd);
		for (var strTag in oEXIFTags) {
			switch (strTag) {
				case "LightSource" :
				case "Flash" :
				case "MeteringMode" :
				case "ExposureProgram" :
				case "SensingMethod" :
				case "SceneCaptureType" :
				case "SceneType" :
				case "CustomRendered" :
				case "WhiteBalance" : 
				case "GainControl" : 
				case "Contrast" :
				case "Saturation" :
				case "Sharpness" : 
				case "SubjectDistanceRange" :
				case "FileSource" :
					oEXIFTags[strTag] = EXIF.StringValues[strTag][oEXIFTags[strTag]];
					break;
	
				case "ExifVersion" :
				case "FlashpixVersion" :
					oEXIFTags[strTag] = String.fromCharCode(oEXIFTags[strTag][0], oEXIFTags[strTag][1], oEXIFTags[strTag][2], oEXIFTags[strTag][3]);
					break;
	
				case "ComponentsConfiguration" : 
					oEXIFTags[strTag] = 
						EXIF.StringValues.Components[oEXIFTags[strTag][0]]
						+ EXIF.StringValues.Components[oEXIFTags[strTag][1]]
						+ EXIF.StringValues.Components[oEXIFTags[strTag][2]]
						+ EXIF.StringValues.Components[oEXIFTags[strTag][3]];
					break;
			}
			oTags[strTag] = oEXIFTags[strTag];
		}
	}
 
	if (oTags.GPSInfoIFDPointer) {
		var oGPSTags = readTags(oFile, iTIFFOffset, iTIFFOffset + oTags.GPSInfoIFDPointer, EXIF.GPSTags, bBigEnd);
		for (var strTag in oGPSTags) {
			switch (strTag) {
				case "GPSVersionID" : 
					oGPSTags[strTag] = oGPSTags[strTag][0] 
						+ "." + oGPSTags[strTag][1] 
						+ "." + oGPSTags[strTag][2] 
						+ "." + oGPSTags[strTag][3];
					break;
			}
			oTags[strTag] = oGPSTags[strTag];
		}
	}
 
	return oTags;
}
 
 
EXIF.getData = function(oImg, fncCallback) 
{
	if (!oImg.complete) return false;
	if (!imageHasData(oImg)) {
		getImageData(oImg, fncCallback);
	} else {
		if (fncCallback) fncCallback();
	}
	return true;
}
 
EXIF.getTag = function(oImg, strTag) 
{
	if (!imageHasData(oImg)) return;
	return oImg.exifdata[strTag];
}
 
EXIF.getAllTags = function(oImg) 
{
	if (!imageHasData(oImg)) return {};
	var oData = oImg.exifdata;
	var oAllTags = {};
	for (var a in oData) {
		if (oData.hasOwnProperty(a)) {
			oAllTags[a] = oData[a];
		}
	}
	return oAllTags;
}
 
 
EXIF.pretty = function(oImg) 
{
	if (!imageHasData(oImg)) return "";
	var oData = oImg.exifdata;
	var strPretty = "";
	for (var a in oData) {
		if (oData.hasOwnProperty(a)) {
			if (typeof oData[a] == "object") {
				strPretty += a + " : [" + oData[a].length + " values]\r\n";
			} else {
				strPretty += a + " : " + oData[a] + "\r\n";
			}
		}
	}
	return strPretty;
}
 
EXIF.readFromBinaryFile = function(oFile) {
	return findEXIFinJPEG(oFile);
}
 
function loadAllImages() 
{
	var aImages = document.getElementsByTagName("img");
	for (var i=0;i<aImages.length;i++) {
		if (aImages[i].getAttribute("exif") == "true") {
			if (!aImages[i].complete) {
				addEvent(aImages[i], "load", 
					function() {
						EXIF.getData(this);
					}
				); 
			} else {
				EXIF.getData(aImages[i]);
			}
		}
	}
}
 
addEvent(window, "load", loadAllImages); 
 
})();
 